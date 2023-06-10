<template>
    <h1 class="text-4xl pb-2 text-title font-bold">Calculator</h1>
    <p>Calculate how many Stellar Jades are required for <br> your next 4/5 star pulls.</p>
    <Split/>
    <div class="grid grid-cols-2 md:flex md:gap-10 flex-wrap gap-5">
        <div class="flex flex-col gap-10">
            <div class="flex flex-row flex-wrap content-start gap-2">
                <Input value="star_rail_pass"/>
                <Input value="stellar_jade"/>
                <Input value="oneiric_shard"/>
                <Input value="undying_embers"/>
                <Input value="undying_starlight"/>
            </div>
            <div class="flex flex-row flex-wrap content-start gap-2">
                <Input value="current_pity"/>
                <Input value="days_until_pull"/>
                <Toggle value="express_supply_pass"/>
                <Switch value="banner_type" option="light_cone"/>
                <Switch value="refund_4_stars" toggled="true"/>
            </div>
        </div>
        <div class="flex flex-wrap gap-10">
            <div class="bgcontainer w-full h-auto flex flex-wrap p-5 gap-5 items-center justify-center">
                <div>
                    <p class="text-xl"><span class="text-title">{{ total_jades }}x</span> Stellar Jade</p>
                    <div class="pl-5">
                        <p>+ <span class="text-title">{{ stellar_jade }}x</span> Owned</p>
                        <p>+ <span class="text-title">{{ oneiric_shard }}x</span> Oneiric Shard</p>
                        <p>+ <span class="text-title">{{ training_jades }}x</span> Daily Training</p>
                        <p>+ <span class="text-title">{{ hertas_jades }}x</span> Herta's Simulated Universe</p>
                        <p>+ <span class="text-title">{{ express_jades }}x</span> Express Supply Pass</p>
                    </div>
                </div>
                <div>
                    <p class="text-xl"><span class="text-title">{{ total_star_rail_passes }}x</span> Star Rail Pass</p>
                    <div class="pl-5">
                        <p>+ <span class="text-title">{{ star_rail_pass }}x</span> Owned</p>
                        <p>+ <span class="text-title">{{ current_pity }}x</span> Previous Warps</p>
                        <p>+ <span class="text-title">{{ jade_passes }}x</span> Stellar Jade Exchange</p>
                        <p>+ <span class="text-title">{{ undying_embers_passes }}x</span> Undying Embers Exchange</p>
                        <p>+ <span class="text-title">{{ undying_starlight_passes }}x</span> Undying Starlight Exchange</p>
                        <p>+ <span class="text-title">{{ star_4_refund_passes }}x</span> 4 Star Refund</p>
                    </div>
                </div>
            </div>
            <div class="bgcontainer w-full h-auto flex flex-wrap p-5 gap-5 items-center justify-center">
                <div>
                    <p class="flex flex-row gap-1">Soft Pity: <span class="text-title">{{ soft_pity }}</span>
                        <Tooltip v-if="banner_type" 
                        message="This value is pure speculation. 
                        Confirmed values have yet to be discovered." icon="warning"/>
                    </p>
                    <p>Hard Pity: <span class="text-title">{{ hard_pity }}</span></p>
                </div>
                <div class="child:flex child:flex-row">
                    <p class="inline-image">Chance of 5 <img src="/images/other/star.png"> Warp in next {{ banner_type_name }} pull: <span class="text-title pl-1">{{ next_pull }}%</span>
                        <Tooltip v-if="banner_type" 
                        message="This percentage is pure speculation. 
                        Confirmed values have yet to be discovered." icon="warning"/>
                    </p>
                    <p class="inline-image">Chance of 5 <img src="/images/other/star.png"> Warp in next {{ banner_type_name }} 10 pull: <span class="text-title pl-1">{{ next_10_pull }}%</span>
                        <Tooltip v-if="banner_type" 
                        message="This percentage is pure speculation. 
                        Confirmed values have yet to be discovered." icon="warning"/>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Split from "../components/Split.vue"
    import Tooltip from "../components/Tooltip.vue"
    import Input from "../components/Calculator/Input.vue"
    import Toggle from "../components/Calculator/Toggle.vue"
    import Switch from "../components/Calculator/Switch.vue"
</script>

<script>
    export default {
        data() {
            return {
                star_rail_pass: 0, stellar_jade: 0, oneiric_shard: 0, undying_embers: 0, undying_starlight:0,
                current_pity: 0, days_until_pull: 0, express_supply_pass: false,
                total_jades: 0, training_jades: 0, hertas_jades: 0, express_jades: 0,
                total_star_rail_passes: 0, jade_passes: 0, undying_embers_passes: 0, undying_starlight_passes: 0, star_4_refund_passes: 0, refund_4_stars: true,
                soft_pity: "0.00", hard_pity: "0.00", next_pull: "0.6", next_10_pull: "6",
                banner_type: false, banner_type_name: "Character"
            }
        },
        methods: {
            calculate(input) {
                const inputTarget = input.target

                this[inputTarget.id] = inputTarget.type == "checkbox" ? inputTarget.checked : Number(inputTarget.value)
                
                if (this.days_until_pull > 0) {
                    this.training_jades = 60 * this.days_until_pull
                    this.hertas_jades = 105 * (1 + Math.floor(this.days_until_pull / 7))
                } else {
                    this.training_jades = 0
                    this.hertas_jades = 0
                }

                if (this.express_supply_pass) {
                    this.express_jades = 90 * this.days_until_pull
                } else {
                    this.express_jades = 0
                }

                this.total_jades = this.stellar_jade + this.oneiric_shard + this.training_jades + this.hertas_jades + this.express_jades

                this.jade_passes = Math.floor(this.total_jades / 160)
                this.undying_embers_passes = Math.min(Math.max(Math.floor(this.undying_embers / 160), 0), 5) * (1 + Math.floor(this.days_until_pull / 30))
                this.undying_starlight_passes = Math.floor(this.undying_starlight / 20)

                this.total_star_rail_passes = this.star_rail_pass + this.current_pity + this.jade_passes + this.undying_embers_passes + this.undying_starlight_passes

                if (this.refund_4_stars) {
                    this.star_4_refund_passes = 1 * (Math.floor(this.total_star_rail_passes / 10))
                    this.total_star_rail_passes += this.star_4_refund_passes
                } else {
                    this.star_4_refund_passes = 0
                }

                const totalStarRailPasses = this.total_star_rail_passes

                if (this.banner_type) {
                    this.banner_type_name = "Light Cone"

                    this.soft_pity = (1 - (64 - totalStarRailPasses)/64).toFixed(2)
                    this.hard_pity = (1 - (80 - totalStarRailPasses)/80).toFixed(2)

                    this.next_pull = totalStarRailPasses >= 80 && 100 || totalStarRailPasses >= 64 && (0.8 + ((totalStarRailPasses - 64) * 5.85)).toFixed(0) || 0.8
                    this.next_10_pull = totalStarRailPasses >= 70 && 100 || totalStarRailPasses >= 60 && (3.2 + ((totalStarRailPasses + 9 - 64) * 5.85)).toFixed(0) || 8
                } else {
                    this.banner_type_name = "Character"

                    this.soft_pity = (1 - (74 - totalStarRailPasses)/74).toFixed(2)
                    this.hard_pity = (1 - (90 - totalStarRailPasses)/90).toFixed(2)

                    this.next_pull = totalStarRailPasses >= 90 && 100 || totalStarRailPasses >= 74 && (0.6 + ((totalStarRailPasses - 74) * 5.85)).toFixed(0) || 0.6
                    this.next_10_pull = totalStarRailPasses >= 80 && 100 || totalStarRailPasses >= 70 && (2.4 + ((totalStarRailPasses + 9 - 74) * 5.85)).toFixed(0) || 6
                }
            }
        },
        mounted: function() {
            Array.from(document.getElementsByTagName("input")).forEach(input => {
                input.oninput = this.calculate
            })
        }
    }
</script>