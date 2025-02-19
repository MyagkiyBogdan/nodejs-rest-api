const Contacts = require('../contactsSchema');

const listContacts = async (userId, { skip, limit }) => {
  try {
    // '-__v' - убирает в ответе служное mongoose поле __v. Если указать __v - будет включено только это поле.
    // return Contacts.find({ owner: userId }, '-__v');
    // Так же можно сделать это через select 0 - не показывать, 1 показывать только поля с 1
    return await Contacts.find({ owner: userId }).select({ __v: 0 }).skip(skip).limit(limit);
  } catch (error) {
    console.log(error);
  }
};

const listContactsWithFavorite = async (userId, { skip, limit, favorite }) => {
  try {
    // '-__v' - убирает в ответе служное mongoose пол е __v. Если указать __v - будет включено только это поле.
    // return Contacts.find({ owner: userId }, '-__v');
    // Так же можно сделать это через select 0 - не показывать, 1 показывать только поля с 1
    return await Contacts.find({ owner: userId, favorite })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    return await Contacts.findOne({ _id: contactId, userId });
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    return await Contacts.findByIdAndRemove({ _id: contactId, userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const addContact = async ({ name, email, phone, favorite = false }, userId) => {
  try {
    return await Contacts.create({ name, email, phone, favorite, owner: userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateContactById = async (contactId, { name, email, phone }, userId) => {
  try {
    return await Contacts.findByIdAndUpdate(
      { _id: contactId, userId },
      { $set: { _id: contactId, name, email, phone } }
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateStatusContact = async (contactId, { favorite }, userId) => {
  try {
    return await Contacts.findByIdAndUpdate(
      { _id: contactId, userId },
      {
        $set: { _id: contactId, favorite },
      }
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
  listContactsWithFavorite,
};
