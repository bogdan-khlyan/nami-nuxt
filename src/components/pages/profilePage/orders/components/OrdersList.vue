<template>
  <div class="orders-list">

    <div v-if="windowWidth > 600"
         class="orders-list__orders-table">

      <orders-row-header/>

      <div class="orders-list__row"
           v-for="(item,index) in tableData" :key="item.id">

        <orders-row-info
          :order-info="item"
          :number="index + 1"
          :show-details="selectedOrder === item._id"
          @clickDetails="selectedOrder = $event"
        />

        <el-collapse-transition>
          <orders-row-details
            v-if="selectedOrder === item.id"
            :order-info="item"
          />
        </el-collapse-transition>

      </div>

    </div>
    <div v-else class="orders-list__order-cards">
      <order-card-info
        v-for="(item,index) in tableData" :key="item.id"
        :order-info="item"
        :number="index + 1"
        :show-details="selectedOrder === item.id"
        @clickDetails="selectedOrder = $event"
      />
    </div>

  </div>
</template>

<script>
import OrdersRowHeader from "@/components/pages/profilePage/orders/components/table/OrdersRowHeader";
import OrdersRowInfo from "@/components/pages/profilePage/orders/components/table/OrdersRowInfo";
import OrdersRowDetails from "@/components/pages/profilePage/orders/components/table/OrderTableDetails";
import OrderCardInfo from "@/components/pages/profilePage/orders/components/card/OrderCardInfo";

export default {
  name: 'orders-list',
  components: {
    OrdersRowHeader,
    OrdersRowInfo,
    OrdersRowDetails,
    OrderCardInfo
  },
  data() {
    return {
      tableData: [
        {
          id: 255,
          dateOrder: 1645519227,
          status: 'new',
          amountOrder: 1200,
          amountDelivery: 200,
          details: [
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 1,
              amount: 360
            },
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 3,
              amount: 1360
            }
          ]
        },
        {
          id: 256,
          dateOrder: 1645692027,
          status: 'completed',
          amountOrder: 500,
          amountDelivery: 200,
          details: [
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 2,
              amount: 360
            },
          ]
        },
        {
          id: 257,
          dateOrder: 1645864827,
          status: 'processing',
          amountOrder: 2240,
          amountDelivery: 200,
          details: [
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 4,
              amount: 360
            },
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 5,
              amount: 360
            }
          ]
        },
        {
          id: 258,
          dateOrder: 1646556027,
          status: 'delivered',
          amountOrder: 584,
          amountDelivery: 200,
          details: [
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 1,
              amount: 360
            },
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 2,
              amount: 360
            }
          ]
        },
        {
          id: 259,
          dateOrder: 1646556027,
          status: 'cancelled',
          amountOrder: 900,
          amountDelivery: 200,
          details: [
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 3,
              amount: 360
            },
            {
              title: 'Маки суши с лососем',
              images: ['/api/product/image/6d171267-da32-4480-ae7c-92e7d7b0e0e4.png'],
              ingredients: ['Рис', 'лист нори', 'соус', 'лосось'],
              weight: 125,
              count: 1,
              amount: 360
            }
          ]
        }
      ],
      selectedOrder: null
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  created() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      const data = await this.$orders.getOrders()
      console.log(data)
      this.tableData = data.data
    }
  }
}
</script>

<style lang="scss">
.orders-list {
  margin-top: 16px;

  &__orders-table {
    max-width: 796px;
    margin-bottom: 40px;
    padding: 12px 0;

    background: #FFFFFF;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 10px 10px 10px rgba(212, 217, 230, 0.12), -5px -5px 10px rgba(212, 217, 230, 0.1);
    transition: 0.2s;
  }

  &__row {
    position: relative;

    &:hover {
      &:after {
        opacity: 1;
        transition: 0.1s;
      }

      .orders-row-info {
        background: #FBFCFF;
      }

      .order-table-details {
        background: #FBFCFF;

        .el-table {
          background: #FBFCFF;

          tr, th.el-table__cell {
            background: #FBFCFF;
          }
        }
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: -6px;
      z-index: 1;
      height: 100%;
      width: 6px;

      background: #062D4E;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

      opacity: 0;
    }

    &:nth-child(2) {
      .orders-row-info {
        &:before {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 730px) {
    max-width: 554px;
    margin: 16px auto 40px auto;
  }

}
</style>
