<template>
  <div class="product">
    <div class="product__content">
      <div class="product__images">
        <img v-if="isSingle" :src="product.images[0]" :alt="product.title">
        <img v-else-if="selectedVariant"
             :src="`/api/product/variant/image/${selectedVariant.image}`" :alt="product.title"
             :key="selectedVariant.image">
      </div>
      <div class="product__info">
        <div>
          <h3 :style="titleStyles">{{ product.title }}</h3>
          <div class="product__info-description">
            <span v-if="isSingle">{{ cardDescription }}</span>
            <selected-variant
              v-else
              :selected-variant="selectedVariant"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="product__separator"></div>

    <div class="product__content" style="padding-top: 5px">
      <plus-minus
        :value="count"
        @input="changeCount"
      />

      <div class="product__cost">
        <span v-if="isDiscount">
          <span class="discount">{{ costAll }}</span>
          <span>{{ discountCost }}</span>
        </span>
        <span v-else>{{ costAll }}</span> ₽
      </div>
    </div>

  </div>
</template>

<script>
import PlusMinus from "@/components/common/ui/buttons/PlusMinus";
import SelectedVariant from "@/components/common/SelectedVariant";
import productMixin from "@/mixins/product.mixin";
import {minusDiscount} from "@/utils/discount";

export default {
  name: 'mobile',
  components: { PlusMinus, SelectedVariant },
  mixins: [productMixin],
  props: {
    product: { type: Object }
  },
  computed: {
    discountCost() {
      return minusDiscount(this.costAll, this.config.globalDiscountPercent)
    }
  }
}
</script>

<style scoped lang="scss">
.product {
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 20px 24px;

  width: 100%;
  min-height: 130px;

  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  border-radius: 8px;

  .product__content {
    display: flex;
  }

  .product__images {

    > img {
      width: 96px;
      height: 96px;
      object-fit: contain;
      @media screen and (max-width: 480px) {
        width: 64px;
        height: 64px;
      }
    }

  }

  .product__info {
    display: flex;
    align-items: center;

    padding-left: 40px;

    @media screen and (max-width: 480px) {
      padding-left: 20px;
    }

    > div > h3 {
      margin: 0;

      font-family: Neucha, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 26px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: left;

      color: #141414;
      @media screen and (max-width: 480px) {
        font-size: 20px;
        line-height: 22px;
      }
    }

    > div > .product__info-description {
      margin-top: 5px;

      font-family: SeoulNamsan CM, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;
      text-align: left;

      color: #717171;
      @media screen and (max-width: 480px) {
        font-size: 13px;
        line-height: 15px;
      }
    }

  }

  .product__separator {
    margin-top: 5px;
    margin-bottom: 5px;

    width: 100%;
    height: 1px;

    background: #E6E6E6;
    border-radius: 2px;
  }

  .product__cost {
    margin-left: auto;

    font-family: Neucha, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 24px;

    letter-spacing: 0.05em;

    color: #141414;

    .discount {
      font-size: 18px;
      text-decoration: line-through;
    }

  }

}
</style>
