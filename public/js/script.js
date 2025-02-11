


const app = new Vue({
    el: '#app',
    methods: {
        getJson(url) {
            return fetch(url)
                    .then(text=> text.json())
                    .catch(error=> console.log(!!!!error))
        },
        postJson (url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result=> result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        putJson(url, data){
            return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result=> result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },
    mounted(){

    },
    components: {cart, product, filter_el}
});