<template>
  <div class="order-table-details">
    <el-table :data="orderInfo.full.products" width="auto">
      <el-table-column width="80">
        <template slot-scope="scope">
          <div class="order-table-details__product-photo">
            <img v-if="scope.row.product.type === 'SINGLE'"
                 :src="`/api/product/image/${scope.row.product.images[0]}`" :alt="scope.row.product.title">
            <img v-else
                 :src="`/api/product/variant/image/${scope.row.variant.image}`" :alt="scope.row.variant.title">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Продукты"
        width="370px">
        <template slot-scope="scope">
          <div class="order-table-details__product-title">
            {{ scope.row.product.title }}
          </div>
          <div class="order-table-details__product-info">
            <selected-variant v-if="scope.row.variant" :selected-variant="scope.row.variant"/>
            <template v-else>
              {{ scope.row.product.ingredients.join(', ') }} <span>({{ scope.row.weight }} г)</span>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80" label="Кол-во" prop="count"
                       class-name="product-count">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        class-name="product-amount"
        label="Сумма">
        <template slot-scope="scope">
          <span v-if="scope.row.product.type === 'SINGLE'">{{ scope.row.product.cost }} ₽</span>
          <span v-else>{{ scope.row.variant.cost }} ₽</span>
        </template>
      </el-table-column>
    </el-table>
    <hr>

    <div class="order-table-details__result">
      <div class="order-table-details__result-item">
        <div>Стоимость товаров</div>
        <div>{{ orderInfo.full.productsSum }} ₽</div>
      </div>
      <div class="order-table-details__result-item">
        <div>Доставка</div>
        <div v-if="orderInfo.full.deliveryCost">{{ orderInfo.full.deliveryCost }} ₽</div>
        <div v-else>-</div>
      </div>
      <div class="order-table-details__result-item">
        <div>Итого к оплате</div>
        <div>{{ orderInfo.full.deliveryCost ? (orderInfo.full.productsSum + orderInfo.full.deliveryCost) : orderInfo.full.productsSum }} ₽</div>
      </div>
    </div>

  </div>
</template>

<script>
import SelectedVariant from "@/components/common/SelectedVariant";

export default {
  name: "orders-row-details",
  components: { SelectedVariant },
  props: {
    orderInfo: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.order-table-details {

  padding-left: 70px;
  padding-bottom: 34px;

  transition: 0.2s;

  .el-table {

    th {
      font-family: Ubuntu, sans-serif;
      font-size: 12px;
      font-weight: 300;
      line-height: 18px;

      padding: 6px 0 !important;
      border-bottom: none !important;
      transition: 0.2s;
    }

    td {
      vertical-align: top;
      padding: 8px 0 !important;
      border-bottom: none !important;
    }

    tr {
      transition: 0.2s;
    }

    td.product-amount {
      .cell {
        font-size: 14px !important;
      }
    }

    td.product-count {
      .cell {
        margin-left: auto;
        margin-right: 20px;
        width: max-content;
        font-size: 14px !important;
        line-height: 18px !important;
      }
    }

    &:before {
      display: none;
    }
  }

  hr {
    height: 1px;
    max-width: 575px;
    margin: 8px auto 16px 0;
    background: #E8E8E8;
    border-radius: 2px;
    border: none;
  }

  &__result {
    font-family: Ubuntu, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 18px;
    text-align: right;
    color: #121212;

    max-width: 575px;

    &-item {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 6px;

      &:nth-child(2) {
        margin-bottom: 24px;
      }

      &:last-child {
        div:last-child {
          font-size: 18px;
          font-weight: 400;
        }
      }

      div:last-child {
        width: 60px;
        margin-left: 6px;
      }
    }
  }

  &__product-photo {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 60px;
    height: 60px;

    background: #FFFFFF;
    border: 1px solid #F3F3F3;
    box-sizing: border-box;
    border-radius: 10px;

    img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }

  &__product-title {
    font-family: Ubuntu, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    word-break: break-word;
    color: #121212;
    margin-bottom: 4px;
  }

  &__product-info {
    font-family: Ubuntu, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: 18px;
    word-break: break-word;
    color: #7F848B;
  }

  @media screen and (max-width: 750px) {
    padding-left: 55px;
  }

  @media screen and (max-width: 730px) {
    padding-left: 14px;

    .el-table__body {
      width: 500px !important;

      colgroup > col:nth-child(2) {
        width: 270px !important;
      }
    }
    .el-table__header {
      width: 520px !important;

      colgroup > col:nth-child(2) {
        width: 270px !important;
      }
    }

    td.product-amount > .cell {
      text-align: center;
    }

    &__result {
      max-width: 490px;
    }
  }
}
</style>
