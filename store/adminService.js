export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/service')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/service', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
        return await this.$axios.$patch(`admin/service/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
