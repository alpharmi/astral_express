<script setup>
import Split from '../components/Split.vue'
import Tooltip from '../components/Tooltip.vue'
import Input from '../components/Calculator/Input.vue'
import Toggle from '../components/Calculator/Toggle.vue'
import Switch from '../components/Calculator/Switch.vue'
</script>

<script>
export default {
  data() {
    return {
      star_rail_special_pass: 0,
      stellar_jade: 0,
      oneiric_shard: 0,
      undying_embers: 0,
      undying_starlight: 0,
      current_pity: 0,
      days_until_pull: 0,
      express_supply_pass: false,
      total_jades: 0,
      training_jades: 0,
      hertas_jades: 0,
      express_jades: 0,
      total_star_rail_passes: 0,
      jade_passes: 0,
      undying_embers_passes: 0,
      undying_starlight_passes: 0,
      star_4_refund_passes: 0,
      refund_4_stars: true,
      soft_pity: '0.00',
      hard_pity: '0.00',
      next_pull: '0.6',
      next_10_pull: '6',
      banner_type: false,
      banner_type_name: 'Character',
    }
  },
  mounted() {
    Array.from(document.getElementsByTagName('input')).forEach((input) => {
      input.oninput = this.calculate
    })
  },
  methods: {
    calculate(input) {
      const inputTarget = input.target

      this[inputTarget.id] = inputTarget.type == 'checkbox' ? inputTarget.checked : Number(inputTarget.value)

      if (this.days_until_pull > 0) {
        this.training_jades = 60 * this.days_until_pull
        this.hertas_jades = 105 * (1 + Math.floor(this.days_until_pull / 7))
      }
      else {
        this.training_jades = 0
        this.hertas_jades = 0
      }

      if (this.express_supply_pass)
        this.express_jades = 90 * this.days_until_pull
      else
        this.express_jades = 0

      this.total_jades = this.stellar_jade + this.oneiric_shard + this.training_jades + this.hertas_jades + this.express_jades

      this.jade_passes = Math.floor(this.total_jades / 160)
      this.undying_embers_passes = Math.min(Math.max(Math.floor(this.undying_embers / 160), 0), 5) * (1 + Math.floor(this.days_until_pull / 30))
      this.undying_starlight_passes = Math.floor(this.undying_starlight / 20)

      this.total_star_rail_passes = this.star_rail_special_pass + this.current_pity + this.jade_passes + this.undying_embers_passes + this.undying_starlight_passes

      if (this.refund_4_stars) {
        this.star_4_refund_passes = 1 * (Math.floor(this.total_star_rail_passes / 10))
        this.total_star_rail_passes += this.star_4_refund_passes
      }
      else {
        this.star_4_refund_passes = 0
      }

      const totalStarRailPasses = this.total_star_rail_passes

      if (this.banner_type) {
        this.banner_type_name = 'LightCone'

        this.soft_pity = (1 - (64 - totalStarRailPasses) / 64).toFixed(2)
        this.hard_pity = (1 - (80 - totalStarRailPasses) / 80).toFixed(2)

        this.next_pull = totalStarRailPasses >= 80 && 100 || totalStarRailPasses >= 64 && (0.8 + ((totalStarRailPasses - 64) * 5.85)).toFixed(0) || 0.8
        this.next_10_pull = totalStarRailPasses >= 70 && 100 || totalStarRailPasses >= 60 && (3.2 + ((totalStarRailPasses + 9 - 64) * 5.85)).toFixed(0) || 8
      }
      else {
        this.banner_type_name = 'Character'

        this.soft_pity = (1 - (74 - totalStarRailPasses) / 74).toFixed(2)
        this.hard_pity = (1 - (90 - totalStarRailPasses) / 90).toFixed(2)

        this.next_pull = totalStarRailPasses >= 90 && 100 || totalStarRailPasses >= 74 && (0.6 + ((totalStarRailPasses - 74) * 5.85)).toFixed(0) || 0.6
        this.next_10_pull = totalStarRailPasses >= 80 && 100 || totalStarRailPasses >= 70 && (2.4 + ((totalStarRailPasses + 9 - 74) * 5.85)).toFixed(0) || 6
      }
    },
    getLangValue(val) {
      if (val)
        return this.$t('terms' + `.${val.replace(/_(.)/g, (_, p1) => p1.toUpperCase()).replace(/^./, c => c.toLowerCase())}`)

      else
        return this.value.replaceAll('_', ' ')
    },
  },
}
</script>

<template>
  <h1 class="text-4xl pb-2 text-title font-bold">
    {{ $t('wc.innerTitle') }}
  </h1>
  <p class="w-[300px] whitespace-normal break-all">
    {{ $t('wc.innerDesc') }}
  </p>
  <Split />
  <div class="grid grid-cols-2 md:flex md:gap-10 flex-wrap gap-5">
    <div class="flex flex-col gap-10">
      <div class="flex flex-row flex-wrap content-start gap-2">
        <Input value="star_rail_special_pass" category="valuables" />
        <Input value="stellar_jade" category="currency" />
        <Input value="oneiric_shard" category="currency" />
        <Input value="undying_embers" category="currency" />
        <Input value="undying_starlight" category="currency" />
      </div>
      <div class="flex flex-row flex-wrap content-start gap-2">
        <Input value="current_pity" category="wc.phrases" />
        <Input value="days_until_pull" category="wc.phrases" />
        <Toggle value="express_supply_pass" category="monetization" />
        <Switch value="banner_type" option="light_cone" category="wc.phrases" />
        <Switch value="refund_4_stars" toggled="true" category="wc.phrases" />
      </div>
    </div>
    <div class="flex flex-wrap gap-10">
      <div class="bgcontainer w-full h-auto flex flex-wrap p-5 gap-5 items-center justify-center">
        <div>
          <p class="text-xl">
            <span class="text-title">{{ total_jades }}x</span> {{ $t('wc.terms.stellarJade') }}
          </p>
          <div class="pl-5">
            <p>+ <span class="text-title">{{ stellar_jade }}x</span> {{ $t('wc.terms.owned') }}</p>
            <p>+ <span class="text-title">{{ oneiric_shard }}x</span> {{ $t('currency.oneiricShard') }}</p>
            <p>+ <span class="text-title">{{ training_jades }}x</span> {{ $t('wc.terms.dailyTraining') }}</p>
            <p>+ <span class="text-title">{{ hertas_jades }}x</span> {{ $t('wc.terms.hertaSimulatedUniverse') }}</p>
            <p>+ <span class="text-title">{{ express_jades }}x</span> {{ $t('monetization.expressSupplyPass') }}</p>
          </div>
        </div>
        <div>
          <p class="text-xl">
            <span class="text-title">{{ total_star_rail_passes }}x</span> {{ $t('valuables.starRailSpecialPass') }}
          </p>
          <div class="pl-5">
            <p>+ <span class="text-title">{{ star_rail_special_pass }}x</span> {{ $t('wc.terms.owned') }}</p>
            <p>+ <span class="text-title">{{ current_pity }}x</span> {{ `${$t('wc.words.previous')} ${$t('wc.terms.warps')}` }}</p>
            <p>+ <span class="text-title">{{ jade_passes }}x</span> {{ `${$t('wc.terms.stellarJade')} ${$t('wc.words.exchange')}` }}</p>
            <p>+ <span class="text-title">{{ undying_embers_passes }}x</span> {{ `${$t('wc.terms.undyingEmbers')} ${$t('wc.words.exchange')}` }}</p>
            <p>+ <span class="text-title">{{ undying_starlight_passes }}x</span> {{ `${$t('wc.terms.undyingStarLight')} ${$t('wc.words.exchange')}` }}</p>
            <p>+ <span class="text-title">{{ star_4_refund_passes }}x</span> {{ $t('wc.phrases.fourStarRefund') }}</p>
          </div>
        </div>
      </div>
      <div class="bgcontainer w-full h-auto flex flex-wrap p-5 gap-5 items-center justify-center">
        <div>
          <p class="flex flex-row gap-1">
            {{ $t('terms.softPity') }}: <span class="text-title">{{ soft_pity }}</span>
            <Tooltip
              v-if="banner_type"
              :message="$t('wc.tooltipMessage')" icon="warning"
            />
          </p>
          <p>{{ $t('terms.hardPity') }} <span class="text-title">{{ hard_pity }}</span></p>
        </div>
        <div class="child:flex child:flex-row">
          <i18n-t keypath="wc.5StarChance.content" tag="p" class="inline-image">
            <template #image>
              <img src="/images/other/star.png">  {{ getLangValue(banner_type_name) }}
              <Tooltip
                v-if="banner_type"
                :message="$t('wc.tooltipMessage')" icon="warning"
              />
            </template>
            <template #message>
              <span>{{ ` ${1} ` }}</span>
            </template>
            <template #value>
              <span class="text-title pl-1">{{ next_pull }}%</span>
            </template>
          </i18n-t>

          <i18n-t keypath="wc.5StarChance.content" tag="p" class="inline-image">
            <template #image>
              <img src="/images/other/star.png">  {{ getLangValue(banner_type_name) }}
              <Tooltip
                v-if="banner_type"
                :message="$t('wc.tooltipMessage')" icon="warning"
              />
            </template>
            <template #message>
              <span>{{ ` ${10} ` }}</span>
            </template>
            <template #value>
              <span class="text-title pl-1">{{ next_10_pull }}%</span>
            </template>
          </i18n-t>
        </div>
      </div>
    </div>
  </div>
</template>
