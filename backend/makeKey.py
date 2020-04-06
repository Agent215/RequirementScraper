from Crypto.Random import get_random_bytes
import sys

key = get_random_bytes(16)

file_out = open("encryptedKey.bin", "wb")
file_out.write(key)
file_out.close()