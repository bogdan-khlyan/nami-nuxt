<template>
  <form class="register-form">
    <div class="register-from__code">
      <code-input
        v-model="code"
        :error="$v.code"
        :loading="codeLoading"
        :verified="codeVerified"
        @input="inputCode"/>
    </div>
    <div class="register-form__password">
      <password-input
        v-model="password"
        :error="$v.password"
        :loading="loading"
        placeholder="Введите пароль"
        @input="$v.password.$reset()"/>
    </div>
    <div class="register-form__password">
      <password-input
        v-model="confirmPassword"
        label="Повторите пароль"
        :error="$v.confirmPassword"
        :loading="loading"
        placeholder="Повторите пароль"
        @input="$v.confirmPassword.$reset()"/>
    </div>
  </form>
</template>

<script>
import CodeInput from "@/components/common/ui/inputs/BaseCodeInput";
import PasswordInput from "@/components/common/ui/inputs/BasePasswordInput";

import { validationMixin } from "vuelidate";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default {
  name: 'register-form',
  mixins: [validationMixin],
  components: { CodeInput, PasswordInput },
  props: {
    loading: { type: Boolean, default: false },
    phone: { type: String, default: null }
  },
  data() {
    return {
      codeLoading: false,
      codeVerified: false,

      code: null,
      password: null,
      confirmPassword: null
    }
  },
  methods: {
    async submit() {
      this.$v.code.$touch()
      this.$v.password.$touch()
      this.$v.confirmPassword.$touch()
      if (!this.$v.code.$error && !this.$v.password.$error && !this.$v.confirmPassword.$error) {
        this.$userInstance.signUp({
          phone: this.phone,
          code: this.code,
          password: this.password
        })
      }
      // return new Promise((resolve, reject) => {
      //   this.$v.code.$touch()
      //   this.$v.password.$touch()
      //   this.$v.confirmPassword.$touch()
      //   if (!this.$v.code.$error && !this.$v.password.$error && !this.$v.confirmPassword.$error) {
      //     console.log('register no error')
      //     return setTimeout(() => {
      //       this.$v.code.$reset()
      //       this.$v.password.$reset()
      //       this.$v.confirmPassword.$reset()
      //       this.$router.push('/profile')
      //       this.$userInstance.signIn()
      //       return resolve(true)
      //     }, 2000)
      //   } else {
      //     return reject('validate error')
      //   }
      // })
    },
    inputCode() {
      if (this.code?.length !== 6) {
        this.$v.code.$reset()
        return
      }
      this.$v.code.$touch()
    }
  },
  validations() {
    return {
      password: {
        minLength: minLength(6),
        maxLength: maxLength(128),
        required,
        equalPasswords(value) {
          return value === this.confirmPassword
        }
      },
      confirmPassword: {
        required,
        equalPasswords(value) {
          return value === this.password
        }
      },
      code: {
        maxLength: maxLength(6),
        minLength: minLength(6),
        required,
        async isUnique(value) {
          if (value.length !== 6) {
            return true
          }
          this.codeLoading = true
          try {
            await this.$userInstance.verifyOTP({
              phone: this.phone,
              code: this.code
            })
            this.codeVerified = true
            return true
          } catch (error) {
            return false
          } finally {
            this.codeLoading = false
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.register-form {

  &__password {
    margin-top: 24px;
    @media screen and (max-width: 768px) {
      margin-top: 16px;
    }
  }

}
</style>
