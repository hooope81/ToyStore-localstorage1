
const filter_el = {
    data() {
        return {
            userSearch: ""
        }
    }, 
    template: `<div  class="filter">
                    <form action="#" @submit.prevent="$parent.$refs.product.filter(userSearch)">
                            <input type="text" class="filter__input" v-model="userSearch">
                            <button type="submit">
                            <img src="../../img/search.png" alt="cart">
                        </button>
                    </form>
                </div>
                `
}