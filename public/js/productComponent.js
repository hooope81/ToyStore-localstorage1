const product_item = {
    props: ['item'],
    template: `<div class="card">
                    <img :src="item.img" alt="Some img">
                    <h4>{{item.name}}</h4>
                    <button @click='$root.$refs.cart.toAddProduct(item)'>$ {{item.price}} USD</button>
                </div>`
}

const product = {
    data() {
        return {
            products: [],
            productsUrl: 'products.json',
            filtered: []

        }
    },
    mounted() {
        this.$parent.getJson(this.productsUrl)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    },
    components: { product_item },
    methods: {
        filter(value) {
            let rule = new RegExp(value, 'i');
            this.filtered = this.products.filter(item => rule.test(item.name));
        }
    },
    template: `
    <div class="product__inner">
        <div class="wrapper product__box">
            <div class="product__box">
                <div class="product__header">
                    <h2>Stuffed Animals</h2>
                    <h4>See All Toys &#10142;</h4>
                </div>
                <div class="product">
                <product_item v-for="item of    filtered"  :item="item" :key='item.id' v-if="item.id<=4"></product_item>
                </div>
            </div>
            <div class="product__box">
                <div class="product__header">
                    <h2>Wooden Toys</h2>
                    <h4>See All Toys &#10142;</h4>
                </div>
                <div class="product">
                <product_item v-for="item of    filtered"  :item="item" :key='item.id' v-if="item.id>4"></product_item>
                </div>
            </div>
        </div>
    </div>
    `
}