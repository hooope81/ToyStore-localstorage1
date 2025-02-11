const cart_item = {
    props: ['item'],
    template: `<div class="cart__card">
                    <img :src="item.img" alt="Some img">
                    <div class="cart__right">
                    <h4>{{item.name}}</h4>
                    <p>Price:$ {{item.price}}</p>
                    <p>Quantity:{{item.quantity}}</p>
                    </div>
                    <div class="cart__left">
                    <p>$ {{item.quantity*item.price}}</p>
                    <button @click='$root.$refs.cart.toRemoveProduct(item)'>X</button>
                    </div>
                </div>`
}
const cart = {
    data(){
        return {
            cartUrl: '../../server/db/userCart.json',
            cartItems: [],
            showCart: false,
            count: 0
        }
    },
    methods: {
        toAddProduct(item) {
            let find = this.cartItems.find(el=> item.id === el.id);
            if(find){
                this.$parent.putJson(`/api/putProduct/${find.id}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity:1}, item);
                this.$parent.postJson(`/api/postProduct`, prod)
                    .then(data => {
                    if (data.result === 1) {
                        this.cartItems.push(prod);

                    }
                });
            }
            this.count++;
        },
        toRemoveProduct(item) {
            this.$parent.deleteJson(`/api/deleteProduct/${item.id}`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems = data.cartItems.contents
                        console.log(this.cartItems)
                    }
                })
            this.count--;
        }

    },
    mounted() {
        this.$parent.getJson('/api/getCart')
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            })
    },
    components: {cart_item},
    template: ` <div class="cart__box">
                    <button @click="showCart=!showCart" class="cart__btn">
                        <div class="cart__inner">
                            <p>Cart</p>
                            <img src="img/cart.png" alt="cart"> 
                            <div class="cart__quantity">{{count}}</div>
                        </div>
                    </button>
                    <div class="cart" v-show="showCart">
                        <p v-if="!cartItems.length">The cart is empty</p>
                        <cart_item v-for="item of cartItems" :item="item" :key="item.id"></cart_item>
                    </div>
                </div>
                `
}