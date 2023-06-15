module.exports = {
  up: async query => {
    return await query.bulkInsert('Dogs', [
      { name: 'Lucy', color: 'Red', tail: 2, weight: 20 },
      { name: 'Cooper', color: 'Blue', tail: 1, weight: 15 },
      { name: 'Daisy', color: 'Green', tail: 3, weight: 25 },
      { name: 'Rocky', color: 'Yellow', tail: 2, weight: 18 },
      { name: 'Luna', color: 'Brown', tail: 1, weight: 12 },
      { name: 'Buddy', color: 'Pink', tail: 2, weight: 22 },
      { name: 'Sadie', color: 'Gray', tail: 3, weight: 28 },
      { name: 'Chloe', color: 'Purple', tail: 1, weight: 14 },
      { name: 'Bella', color: 'Orange', tail: 2, weight: 16 },
      { name: 'Duke', color: 'Pink', tail: 0, weight: 12 },
      { name: 'Tucker', color: 'Yellow', tail: 2, weight: 18 },
      { name: 'Bentley', color: 'Brown', tail: 3, weight: 22 },
      { name: 'Ruby', color: 'Orange', tail: 2, weight: 16 },
      { name: 'Milo', color: 'White', tail: 1, weight: 14 }
    ])
  },

  down: async query => {
    return await query.bulkDelete('Dogs', null)
  }
}
