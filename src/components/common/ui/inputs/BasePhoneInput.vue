<template>
  <label class="phone-input"
         :class="[{ focus: isFocus }, { done: isDone }, { error: error.$error }]">
    <span class="phone-input__label">Номер телефона</span>
    <span class="phone-input__content">
      <span class="phone-input__content--label">+ 7 (949)</span>
      <span class="phone-input__content--input">
        <input type="text"
               v-model="number"
               v-mask="'###-##-##'"
               inputmode="numeric"
               placeholder="___-__-__"
               :disabled="isDone"
               @focus="isFocus = true"
               @blur="isFocus = false"
               @input="input">
      </span>
      <span v-if="loading"
            class="phone-input__content--icon">
        <img style="width: 22px;height: 22px"
             src="@/assets/images/spinner.gif" alt="...">
      </span>
      <span v-else
            class="phone-input__content--icon"
            :key="isDone">
        <base-svg
          :src="isDone ? require('@/assets/images/icons/icon-check2.svg') : require('@/assets/images/icons/icon-check.svg')"/>
      </span>
    </span>
  </label>
</template>

<script>
import BaseSvg from "@/components/common/BaseSvg";

export default {
  name: 'phone-input',
  components: { BaseSvg },
  model: { prop: 'value', event: 'input' },
  props: {
    value: { type: String, default: null },
    error: { type: Object, default: null },
    isDone: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      number: null,
      isFocus: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    input($event) {
      this.$emit('input', '+7(949)' + $event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.phone-input {

  &__label {
    display: block;
    margin-bottom: 4px;
    text-align: left;
    font-family: Ubuntu, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: #404040;
  }

  &.focus {
    .phone-input__content {
      border-color: #7695CC;
    }
  }

  &.error {
    .phone-input__content {
      border-color: #FFD8D8;
      background: #FFF5F5;
      input {
        color: #212121;
        &::placeholder {
          color: #212121;
        }
      }
    }
  }

  &__content {
    position: relative;

    display: flex;
    align-items: center;

    width: 386px;
    height: 56px;

    background: #FFFFFF;
    border: 1px solid #D4D9E6;
    box-sizing: border-box;
    border-radius: 4px;

    transition: 200ms;

    @media screen and (max-width: 420px) {
      width: calc(100vw - 20px);
    }

    &:hover {
      border-color: #7695CC;
    }

    &--icon {
      position: absolute;
      top: 0; bottom: 0;
      margin: auto;
      right: 17px;

      display: flex;
      align-items: center;
    }

    &--label {
      position: relative;
      padding-left: 16px;
      padding-right: 12px;

      font-family: Ubuntu, sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #053468;
      letter-spacing: 0.1em;

      @media screen and (max-width: 420px) {
        font-size: 14px;
        padding-left: 12px;
        padding-right: 8px;
        min-width: max-content;
      }

      &:after {
        content: '';
        display: block;

        position: absolute;
        top: 0; bottom: 0;
        margin: auto;
        right: 0;

        width: 1px;
        height: 24px;
        background-color: #D4D9E6;
        border-radius: 2px;
      }

    }

    &--input {
      position: relative;
      padding-left: 12px;
      width: 240px;
      @media screen and (max-width: 420px) {
        width: 100%;
      }

      > input {
        padding: 0;
        width: 100%;
        border: none;

        font-family: Ubuntu, sans-serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        color: #212121;
        letter-spacing: 0.7em;

        background: transparent;
        @media screen and (max-width: 420px) {
          font-size: 14px;
        }

        &::placeholder {
          font-family: Ubuntu, sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
          color: #D4D9E6;
          letter-spacing: 0.7em;
          @media screen and (max-width: 420px) {
            font-size: 14px;
          }
        }

      }

    }

  }
}
</style>

<style lang="scss">
.phone-input {
  &.error {
    .phone-input__content--icon {
      svg path {
        fill: rgba(33, 33, 33, 0.5) !important;
      }
    }
  }
  .phone-input__content--icon {
    svg path {
      transition: 200ms;
    }
  }
  &.focus {
    .phone-input__content--icon {
      > svg path {
        fill: #7695CC;
      }
    }
  }
  &.done {
    .phone-input__content--icon {
      > svg path {
        fill: #0AB258;
      }
    }
  }
}
</style>
