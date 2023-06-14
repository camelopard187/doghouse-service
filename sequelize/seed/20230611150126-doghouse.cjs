module.exports = {
  up: async query => {
    return await query.bulkInsert('Doghouses', [
      { name: 'Cozy Cottage', color: 'Red', tail: 2, weight: 20 },
      { name: 'Paw Palace', color: 'Blue', tail: 1, weight: 15 },
      { name: 'Bark Bungalow', color: 'Green', tail: 3, weight: 25 },
      { name: 'Snug Shack', color: 'Yellow', tail: 2, weight: 18 },
      { name: 'Woof Manor', color: 'Brown', tail: 1, weight: 12 },
      { name: 'Puppy Paradise', color: 'Pink', tail: 2, weight: 22 },
      { name: 'Canine Cabin', color: 'Gray', tail: 3, weight: 28 },
      { name: 'Furry Fortress', color: 'Purple', tail: 1, weight: 14 },
      { name: 'Tail Haven', color: 'Orange', tail: 2, weight: 16 },
      { name: 'Snuggle den', color: 'Pink', tail: 0, weight: 12 },
      { name: 'Woof retreat', color: 'Yellow', tail: 2, weight: 18 },
      { name: 'Furry haven', color: 'Brown', tail: 3, weight: 22 },
      { name: 'Tail wag lodge', color: 'Orange', tail: 2, weight: 16 },
      { name: 'Barkside villa', color: 'White', tail: 1, weight: 14 }
    ])
  },

  down: async query => {
    return await query.bulkDelete('Doghouses', null)
  }
}
