export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/product')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
      try {
            return await this.$axios.$post('admin/product', data, {
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
      return await this.$axios.$post(`admin/product/${params.id}`, params.data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      throw error;
    }
  },

  async delProdDetRelation({}, data){
        try {
           return await this.$axios.$delete(`admin/product/delProdDetRelation/${data.prId}/${data.detId}`);
        } catch (error) {
            throw error;
        }
    },

  async delProdPic({}, data){
    try {
      return await this.$axios.$delete(`admin/product/delProdPic/${data.picId}`);
    } catch (error) {
      throw error;
    }
  },

  async updProdPic({}, params){
    try {
      return await this.$axios.$post(`admin/product/updProdPic`, {id:params.id,status: params.status})
    } catch (error) {
      throw error;
    }
  },

  async delete({}, id){
        try {
           return await this.$axios.$delete(`admin/product/${id}`);
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
