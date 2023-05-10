<template>
    <Line width="full" :data="chartData" :options="chartOptions"/>
</template>

<script>
    import { Line } from "vue-chartjs"
    import { Chart as ChartJS, Tooltip, PointElement, LineElement, CategoryScale, LinearScale, Filler} from 'chart.js'

    ChartJS.register(Tooltip, PointElement, LineElement, CategoryScale, LinearScale, Filler)

    export default {
        components: { Line },
        props: {
            monthlyPulls: Object
        },
        methods: {
            formatData() {
                const ctx = document.getElementById("warpHistory")
                const monthlyPulls = this.monthlyPulls
                const pullValues = Object.values(monthlyPulls)

                return {
                    labels: Object.keys(monthlyPulls),
                    datasets: [
                        {
                            label: "5* Warps",
                            data: pullValues.map(pulls => pulls[1]),
                            backgroundColor: "#ffb13fB3",
                            borderColor: "#ffbc57",
                            pointHitRadius: 50,
                        },
                        {
                            label: "4* Warps",
                            data: pullValues.map(pulls => pulls[2]),
                            backgroundColor: "#d28fd6B3",
                            borderColor: "#d9a3dc",
                            pointHitRadius: 50,
                        },
                        {
                            label: "Total Warps",
                            data: pullValues.map(pulls => pulls[0]),
                            backgroundColor: "#b3d9ffB3",
                            borderColor: "#cce5ff",
                            pointHitRadius: 50,
                        }
                    ]
                }
            }
        },
        computed: {
            chartData() {
                return this.formatData()
            }
        },
        data() {
            return {
                //chartData: this.formatData(),
                chartOptions: {
                    //responsive: true,
                    fill: true,
                    tension: 0.2,
                    opacity: 0.5,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 1
                        }
                    },
                    interaction: {
                        mode: "index"
                    }
                }
            }
        }
    }
</script>