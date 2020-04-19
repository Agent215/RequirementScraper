import React from 'react';
import {render} from '@testing-library/react';
//import App from './App';

//test('renders learn react link', () => {
//  const { getByText } = render(<App />);
//  const linkElement = getByText(/learn react/i);
//  expect(linkElement).toBeInTheDocument();
//});

import courses_reducer from './reducers/courses';
import * as courses_types from './actions/courses';

import deleting_reducer from './reducers/deleting';
import * as deleting_types from './actions/deleting';

import LoadingState from "./reducers/loadingState";

import loggedIn_reducer from './reducers/loggedIn';
import * as loggedIn_types from './actions/loggedIn';

import messages_reducer from './reducers/messages';
import * as messages_types from './actions/messages';

import requirements_reducer from './reducers/requirements';
import * as requirements_types from './actions/requirements';

import statistics_reducer from './reducers/statistics';
import * as statistics_types from './actions/statistics';

import theme_reducer from './reducers/theme';
import * as theme_types from './actions/theme';

import user_reducer from './reducers/user';
import * as user_types from './actions/user';

import expect from 'expect';

const testError = Error ('test error')
describe('course reducer', () => {
/*  it('should handle the SET_COMPLETED', () => {
    expect(courses_reducer(undefined, courses_types.setCompleted())).toEqual(
	  {
	    completed: [],
        loaded: LoadingState.LOADED,
        error: null
	  }
	)
  })
*/
  it('should handle the default', () => {
    expect(courses_reducer({text: 'testing text'}, {})).toEqual(
	  {
	    text: 'testing text'
	  }
	)
  })

  it('should handle CLEAR_COMPLETED', () => {
    expect(courses_reducer({text: 'testing text'}, courses_types.clearCompleted())).toEqual(
	  {
	    completed: [],
		loaded: LoadingState.NOT_LOADED,
		error: null
	  }
	)
  })
  
  it('should handle FETCH_COMPLETED_DONE', () => {
    expect(courses_reducer(undefined, courses_types.fetchCompletedDone())).toEqual(
	  {
	    completed: [],
        loaded: LoadingState.LOADED,
        error: null
	  }
	)
  })
  
  it('should handle FETCH_COMPLETED_START', () => {
    expect(courses_reducer(undefined, courses_types.fetchCompletedStart())).toEqual(
	  {
	    completed: [],
        loaded: LoadingState.LOADING,
        error: null
	  }
	)
  })
  
  it('should handle FETCH_COMPLETED_ERROR', () => {
    expect(courses_reducer(undefined, courses_types.fetchCompletedError(testError))).toEqual(
	  {
	    completed: [],
        loaded: LoadingState.ERRORED,
        error: testError
	  }
	)
  })  
});


describe('deleting reducer', () => {
  it('should handle DELETE_RESET', () => {
    expect(deleting_reducer({text: 'testing text'}, deleting_types.resetDeleting())).toEqual(
	  {
	    state: 1,
        error: null
	  }
	)
  })

  it('should handle DELETING', () => {
    expect(deleting_reducer(undefined, deleting_types.deleting())).toEqual(
	  {
	    state: 2,
        error: null
	  }
	)
  })

  it('should handle DELETE_SUCCESSFUL', () => {
    expect(deleting_reducer(undefined, deleting_types.deleteSuccessful())).toEqual(
	  {
	    state: 4,
        error: null
	  }
	)
  })  

  it('should handle DELETE_FAILED', () => {
    expect(deleting_reducer(undefined, deleting_types.deleteFailed(testError))).toEqual(
	  {
	    state: 8,
        error: testError
	  }
	)
  })

  it('should handle default', () => {
    expect(deleting_reducer({text: 'testing text'}, {})).toEqual(
	  {
	    text: 'testing text'
	  }
	)
  })
});


describe('loadingState reducer', () => {
  it('should return 1; NOT_LOADED', () => {
    expect(LoadingState.NOT_LOADED).toEqual(
	    1
	)
  })

  it('should return 2; LOADING', () => {
    expect(LoadingState.LOADING).toEqual(
	    2
	)
  })

  it('should return 4; LOADED', () => {
    expect(LoadingState.LOADED).toEqual(
	    4
	)
  })

  it('should return 8; ERRORED', () => {
    expect(LoadingState.ERRORED).toEqual(
	    8
	)
  })
});


describe('loggingin reducer', () => {
  it('should handle LOG_IN', () => {
    expect(loggedIn_reducer(undefined, loggedIn_types.loggedIn())).toEqual(
	  4
	)
  })

  it('should handle LOGGING_IN', () => {
    expect(loggedIn_reducer(undefined, loggedIn_types.loggingIn())).toEqual(
	  2
	)
  })

  it('should handle DELETE_SUCCESSFUL', () => {
    expect(loggedIn_reducer(undefined, loggedIn_types.loggedOut())).toEqual(
	  1
	)
  })  

  it('should handle default', () => {
    expect(loggedIn_reducer({text: 'testing text'}, {})).toEqual(
	  {
	    text: 'testing text'
	  }
	)
  })
});


describe('messages reducer', () => {
  it('should handle ADD_MESSAGES returns valid UUID v4', () => {
    expect(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
	       (Object.keys(messages_reducer(undefined, messages_types.addMessage("testing", "text", "hello",))))[0].toString()
		   )).toEqual(
	  
	  true
	  
	)
  })

  it('should handle ADD_MESSAGES returns valid message object', () => {
    expect((Object.values(messages_reducer(undefined, messages_types.addMessage("testing", "text", "hello",))))[0]).toEqual(
	  {
	    "header": "text",
        "icon": null,
        "text": "hello",
        "variant": "testing",
	  }
	)
  })

  it('should handle REMOVE_MESSAGE (message removed)', () => {
    expect(messages_reducer({"a": {
	    "header": "text",
        "icon": null,
        "text": "hello",
        "variant": "testing",
	}}, messages_types.removeMessage("a"))).toEqual(
	  {
	  }
	)
  })  

  it('should handle REMOVE_MESSAGE (no change)', () => {
    expect(messages_reducer({"a": {
	    "header": "text",
        "icon": null,
        "text": "hello",
        "variant": "testing",
	}}, messages_types.removeMessage("b"))).toEqual(
	  {
		"a": {
	      "header": "text",
          "icon": null,
          "text": "hello",
          "variant": "testing"
		}
	  }
	)
  })  

  it('should handle default', () => {
    expect(messages_reducer({text: 'testing text'}, {})).toEqual(
	  {
	    text: 'testing text'
	  }
	)
  })
});


describe('requirements reducer', () => {
  it('should handle SET_REQUIREMENTS', () => {
    expect(requirements_reducer(undefined, requirements_types.setRequirements("testing"))).toEqual(
	  {
		requirements: "testing",
		loaded: LoadingState.NOT_LOADED,
		error: null
	  }
	)
  })

  it('should handle CLEAR REQUIREMENTS', () => {
    expect(requirements_reducer({requirements: "testing", loaded: LoadingState.NOT_LOADED, error: null}, requirements_types.clearRequirements())).toEqual(
	  {
		requirements: [],
		loaded: LoadingState.NOT_LOADED,
		error: null
	  }
	)
  })

  it('should handle FETCH_REQUIREMENTS_DONE', () => {
    expect(requirements_reducer(undefined, requirements_types.fetchRequirementsDone())).toEqual(
	  {
		requirements: [],
		loaded: LoadingState.LOADED,
		error: null
	  }
	)
  })  

  it('should handle FETCH_REQUIREMENTS_START', () => {
    expect(requirements_reducer(undefined, requirements_types.fetchRequirementsStart())).toEqual(
	  {
		requirements: [],
		loaded: LoadingState.LOADING,
		error: null
	  }
	)
  }) 

  it('should handle FETCH_REQUIREMENTS_ERROR', () => {
    expect(requirements_reducer(undefined, requirements_types.fetchRequirementsError(testError))).toEqual(
	  {
		requirements: [],
		loaded: LoadingState.ERRORED,
		error: testError
	  }
	)
  }) 
  it('should handle default', () => {
    expect(requirements_reducer({text: 'testing text'}, {})).toEqual(
	  {
	    text: 'testing text'
	  }
	)
  })

});


describe('statistics reducer', () => {
/*  it('should handle SET_STATISTICS', () => {
    expect(statistics_reducer({GPA:3.5, requirements:{requirementCount: 4,requirementsDone: 3,requirementsIP: 1}, totalCredits:{totalCredits:100, registeredCredits:15}}, statistics_types.setStatistics("testing"))).toEqual(
	  {
		
	  }
	)
  })
*/
  it('should handle CLEAR_STATISTICS', () => {
    expect(statistics_reducer({requirements: "testing", loaded: LoadingState.NOT_LOADED, error: null}, statistics_types.clearStatistics())).toEqual(
	  {
		statistics: [],
		loaded: LoadingState.NOT_LOADED,
		error: null
	  }
	)
  })

  it('should handle FETCH_STATISTICS_DONE', () => {
    expect(statistics_reducer(undefined, statistics_types.fetchStatisticsDone())).toEqual(
	  {
		statistics: [],
		loaded: LoadingState.LOADED,
		error: null
	  }
	)
  })  

  it('should handle FETCH_STATISTICS_START', () => {
    expect(statistics_reducer(undefined, statistics_types.fetchStatisticsStart())).toEqual(
	  {
		statistics: [],
		loaded: LoadingState.LOADING,
		error: null
	  }
	)
  }) 

  it('should handle FETCH_STATISTICS_ERROR', () => {
    expect(statistics_reducer(undefined, statistics_types.fetchStatisticsError(testError))).toEqual(
	  {
		statistics: [],
		loaded: LoadingState.ERRORED,
		error: testError
	  }
	)
  })
  it('should handle default', () => {
    expect(statistics_reducer({text: 'testing text'}, {})).toEqual(
	  {
	    text: 'testing text'
	  }
	)
  })
});  


describe('theme reducer', () => {
  it('should handle SET_THEME', () => {
    expect(theme_reducer(undefined, theme_types.setTheme("test"))).toEqual(
	  {
		primary: "test",
		dark: true
	  }
	)
  })

  it('should handle TOGGLE_DARK', () => {
    expect(theme_reducer(undefined, theme_types.toggleDark())).toEqual(
	  {
		primary: "cherry",
		dark: false
	  }
	)
  })  

  it('should handle default', () => {
    expect(theme_reducer({text : 'testing text'}, {})).toEqual(
	  {
		text: 'testing text'
	  }
	)
  })
});


describe('user reducer', () => {
  it('should handle SET_USER', () => {
    expect(user_reducer(undefined, user_types.setUser("007", "James", "Bond"))).toEqual(
	  {
		user_id: "007",
        username: "James",
        password: "Bond"
	  }
	)
  })

  it('should handle CLEAR_USER', () => {
    expect(user_reducer(undefined, user_types.clearUser())).toEqual(
	  null
	)
  })  

  it('should handle default', () => {
    expect(user_reducer({text : 'testing text'}, {})).toEqual(
	  {
		text: 'testing text'
	  }
	)
  })
});
