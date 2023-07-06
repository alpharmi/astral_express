<script>
export default {
  data() {
    return {
      languages: [],
    }
  },
  created() {
    const preferredLanguage
  = navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
    if (preferredLanguage.includes('zh')) {
      if (preferredLanguage === 'zh-TW' || preferredLanguage === 'zh-HK')
        this.$i18n.locale = 'zhTW'

      else
        this.$i18n.locale = 'zhCN'
    }
  },
}
</script>

<template />
