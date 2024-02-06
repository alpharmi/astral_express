<template>
    <div class="flex w-full min-h-screen items-center place-content-center justify-center gap-5">
        <div class="flex flex-row gap-5 flex-wrap justify-center">
            <div class="flex flex-col gap-5">
                <div class="container w-[27rem] h-40 pt-3">
                    <div class="absolute -left-5 top-2 bg-title w-max h-auto py-1 pl-2 pr-3 rounded-[0_1rem_0_0] font-bold text-bg">Welcome to Astral Express</div>
                    <div class="absolute top-12 w-full">
                        <p>Multipurpose tool that currently includes to help with your Honkai Adventures. Currently includes warp history, warp calculator, and general game information.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-5 ">
                <div class="container w-[27rem] h-40 pt-3">
                    <div class="absolute top-0 w-full">
                        <p>Calculate the amount of warps needed to hit your next soft or hard pity. Includes the option to switch between Character and Light Cone banners.</p>
                        <button class="flex button mt-3 gap-2 p-1 px-3 items-center">
                            <img class="w-9" src="/images/other/oneiric_shard.webp">
                            <p class="font-bold">Warp Calculator ></p>
                        </button>
                    </div>
                </div>
                <div class="container w-[27rem] h-40 pt-3">
                    <div class="absolute top-0 w-full">
                        <p>Import your warp history to view your latest and previous pulls for Character, Light Cone, and Regular banners.</p>
                        <button class="flex button mt-3 gap-2 p-1 px-3 items-center">
                            <img class="w-9" src="/images/other/star_rail_pass.webp">
                            <p class="font-bold">Warp History ></p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>