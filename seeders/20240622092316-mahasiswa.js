'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert(
         'mahasiswas',
         [
            {
               namaMahasiswa: 'John Doe',
               beasiswaId: 1, // Pastikan bahwa ID 1 ini ada di tabel Beasiswa
               programStudiId: 1, // Pastikan bahwa ID 1 ini ada di tabel Programstudis
               statusAplikasi: 'Pending',
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               namaMahasiswa: 'Jane Smith',
               beasiswaId: 2, // Pastikan bahwa ID 2 ini ada di tabel Beasiswa
               programStudiId: 2, // Pastikan bahwa ID 2 ini ada di tabel Programstudis
               statusAplikasi: 'Accepted',
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('mahasiswas', null, {});
   },
};
