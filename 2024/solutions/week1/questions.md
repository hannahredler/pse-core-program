# Encryption

**🤔 Consider the following:**

1. What is the primary difference between symmetric and asymmetric encryption?

   The main difference between symmetric and asymmetric encryption is the no. of keys used. For symmetric encryption, only one key is used for both encrypting and decrypting the data. The key can be smaller, and the process is faster. However the data can normally only be encrypted and decrypted by one person as, if the key is leaked, the entire process is comprimised.

   For asymmetric encryption, there are two keys; one for encrypting (public key) and another for decrypting (private key). The process is slower, however it is safer; the public key can be shared, yet it is still safe as long as the private key remains private.

2. Can you briefly explain how AES (Advanced Encryption Standard) works?

   AES takes data of 128 bits and encrypts it using symmetric encryption into another 128 bit block. It does this using a key, which can be 128, 192 or 256 bits long (all are secure, but longer is even more secure). This is expanded into a number of keys (for an 128 bit key, its expanded into 11 keys).

   - First, it takes the bits and arranges them into a 4x4 grid of 1 byte each.
   - Next, it adds the Round Key. This consists of taking the first expanded key and performing an XOR operation against the data.
   - Then it consists a series of rounds with the following keys (for 128 bits, 10 rounds):
     - It swaps out each byte for another byte using a lookup table (thus the operation is fast).
     - Following this, it shuffles the rows
     - Then it shuffles the columns;
     - then it performs the XOR operation using the round key.

3. What makes RSA a popular choice for public-key encryption?

   RSA is a form of asymmetric encryption. However, since this type of encryption is quite heavy, it does a hybrid of symmetric and asymmetric encryption; it encrypts the data using symmetric encryption, and then it encrypts the key using asymmetric encryption. Without being able to decrypt the symmetric key, the data can't be decrypted.

   - RSA is popular because it is secure but efficient
   - Uses primes to create a function that is super easy to calculate but very hard to decrypt
   - The mathematics is fairly easy to understand compared to say elliptic curve cryptography
   - It can be efficiently incorporated into hardware, intel chips etc
   - It has stood the test of time, therefore is highly trusted (out since the 70s)
   - Patent-free (making it fairly cheap) unlike many elliptic curve models
