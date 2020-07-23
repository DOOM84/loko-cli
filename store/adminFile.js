export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/file')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
      try {
            return await this.$axios.$post('admin/file', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
            })
        } catch (error) {
            throw error;
        }
    },

  async update({}, params){
    try {
      return await this.$axios.$post(`admin/file/${params.id}`, params.data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      throw error;
    }
  },

  async delete({}, id){
        try {
           return await this.$axios.$delete(`admin/file/${id}`);
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
