const prisma = require('../client')

async function main() {
    try {
        console.log("Starting to create users...");
    
        await createUser({ 
          username: 'albert', 
          password: 'bertie99',
          name: 'Al Bert',
          location: 'Sidney, Australia' 
        });
        await createUser({ 
          username: 'sandra', 
          password: '2sandy4me',
          name: 'Just Sandra',
          location: 'Ain\'t tellin\''
        });
        await createUser({ 
          username: 'glamgal',
          password: 'soglam',
          name: 'Joshua',
          location: 'Upper East Side'
        });
        
        console.log("Finished creating users!");
      } catch (error) {
        console.error("Error creating users!");
        throw error;
      }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })