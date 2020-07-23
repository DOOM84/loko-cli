export const state = () => ({
  contact: null,
});

export const mutations = {
  SET_CONTACT(state, data){
    state.contact = data;
  },

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('index')
        } catch (error) {
            throw error;
        }
    },

  async product({}, data) {
    try {
      return await this.$axios.$get(`getProduct/${data.slug}`);
    } catch (error) {
      throw error;
    }
  },

  async contacts({commit}) {
        try {
          const {contact} = await this.$axios.$get('contacts')
          commit('SET_CONTACT', contact.address);
        } catch (error) {
            throw error;
        }
    },


};

export const getters = {
  contact(state){
    return state.contact
  },
  };
