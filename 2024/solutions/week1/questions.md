# Encryption

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

# Hashing

1. What is a hash function and what are its primary uses in cryptography?

   A hash function is a one-way function that takes an input and returns a fixed length output

2. How does the SHA-256 hashing algorithm function, in simple terms?

   SHA-256 works in several steps:

   - DATA PRE-PROCESSING: it takes a variable length input and then pads it to get to a multiple of 512 bits
   - MESSAGE EXPANSION: It takes the 512 bit word, and splits it into 16 32-bit words. Then it takes these and splits into 64x 32 bit words
   - MESSAGE COMPRESSION: 64 word message block is then processed via 64 rounds, each containing the folowing steps:
     - Find the round constant: 32 bit constant value based on position in sequence
     - Calculate message schedule: 64-entry message schedule generated based on the block and the round constant
     - Update working variable:
     - Calculate the hash value: Final step after all rounds - combine working variables to produce the 256 bit hash value

3. What is the Poseidon hash function and why is it particularly useful in ZKPs?

   Poseidon hash function is a newer function used for zero-knowledge proof systems. Its an alternative to SHA-256 and made to optimize for this use case specifically, as SHA-256 can take up to a minute to verify proofs (Z-cash). Poseidon is able to operate in a big finite field, over large circuits in a much faster time. It can prove the existence of an item in a very large merkel tree in a very short amount of time (1 second)

# Merkle Trees

1. Can you describe the structure of a Merkle tree?

   A merkle tree consists of the following

   - The leafs are chunks of data, hashed
   - each pair of leaves are hashed to create a parent hash
   - parent nodes are hashed together until we reach a final root node

2. How are Merkle trees used within the blockchain context?

   Merkle trees are used for:

   - Proof of Work Mining: When mining a bitcoin block, miners have to take the block data, and search for a nonce that, when all hashed together, creates a hash that satisfies certain conditions. This involves rehashing potentially trillions of times. By arranging the transactions in a merkle tree, they only have to include the root hash in the block header and hash that, rather than hashing all the transactions which is expensive
   - Verification: To see if an item is in a tree, I only need the sibling hashes as I go up the tree. Requires much less computational power.

3. Why are Merkle trees useful for efficient and secure verification of large data structures?

   Merkle trees are useful for efficient and secure verification of large data structures because they allow the number of operations required for verification to be minimized. To see if data is corrupted, it is sufficient to compare the root hash of the tree. If they are the same, then the data is the same. If they are different, then some of the data has been corrupted. If this is the case, you can request the children hashes and keep traversing through the differing nodes until you find the corrupted value. This is much faster than validating every piece of data in the tree.

   Similarly if you want to prove a particular transaction is in a merkle tree you dont need to hash every single step. You just need the sibling node on each level, and hash once at each level. This vastly reduces the number of hashes required to calculate.

# Digital Signatures

1.  Can you describe what digital signatures are and why they are essential in digital communications?

    It doesn't make sense to encrypt every bit of data (not very efficient when the payload is large). Thus, often we send the data first, and then a signature with a reference to the data to verify that the data did in fact come from a known and trusted source.

2.  Explain the workings of the Digital Signature Algorithm (DSA).

    DSA is an algorithm for creating a digital signature, using prime numbers and modulus.

    - First, you generate a key pair. The private key stays private, and the public key is shared.

# Discrete Logarithm Problem Based Cryptography

1. What is the Discrete Logarithm Problem (DLP)?

The discrete logarithm is as follows;

- Let p be a large prime, and
- g a generator that generates numbers in the group $Z_p^*$

Then the result $x = g^b mod(p)$ is computationally infeasible to solve for b

2. How does the Diffie-Hellman protocol work?

   Diffie-Hellman protocol uses the DLP as such:

   - Anna and Bob select a large prime p, and a generator g. These are public.
   - Anna choses a private key a where $1 < a < p$ and calculates the public key as $A=g^a mod p$.
   - Bob choses a private key b where $1 < b < p$ and calculates the public key as $B=g^b mod p$
   - They pass eachother the public keys, and then each calculate the same key by raising $B^a$ and $A^b$
   - This way they have the same key to encrypt, without ever having to share the secrets

3. What is the main idea behind ElGamal encryption?

   ElGamal encryption is an application of the Diffie-Hellman protocol.

   - Anna and Bob select a large prime p, and a generator g. These are public.
   - Anna choses a private key a where $1 < a < p$ and calculates the public key as $A=g^a mod p$.
   - She shares with Bob A, p, g
   - Bob calculates B like above, and encypts the message $M = m x A^b mod p
   - He sends back the message [B,M]
   - Alice can decrypt this message using her calculated values and his encrypted message

4. Can you name a drawback of using DLP-based systems?

   They can be slow, require large key sized for high levels of security and can be vulnerable to certain attacks.
