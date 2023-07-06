<script setup>
import {usePackageStore} from '@/stores/package'
import { storeToRefs } from "pinia";
const store = usePackageStore()  
const { subscriptions } = storeToRefs (store)
store.getSubscription()
</script>
<template>
    <main>
        <div class="container pckcustom-container">
			<section class="pgTitle" v-motion-pop-bounce>My Package</section>
				<div class="mt-5" v-for="(plan, index) in subscriptions" :key="plan.id">
				<section class="pkSatus">
					<div class="row">
						<div class="col-md-6 col-lg-6">
							<div class="pkSatusLeft">
								<h3>Active Package:</h3>
								<h5>{{ plan.remaining_days }} days left </h5>
							</div>
						</div>
						<div class="col-md-6 col-lg-6">
							<div class="pkSatusright">
								<h3>{{ plan.packages.title }} </h3>
								<h5>${{ plan.packages.price }}</h5>
							</div>
						</div>
					</div>
				</section>
				<section class="pBar">
					<div class="pBarLine" v-if="plan.remaining_days == 30">&nbsp;</div>
					<div class="pBarLine" style="background: #FF5656;" :style="{width: `${plan.progress_width}%` }">&nbsp;</div>
				</section>
				<section class="pFeatures">
					<div class="row">
						<div class="col-md-4 col-lg-4">
							<div class="featureSec">
								<h3>Features:</h3>
							</div>
						</div>
						<div class="col-md-8 col-lg-8">
							<div class="featureList">
								<ul class="listStyle" :class="{ invalidlistStyle: plan.package_expire}">
									<li v-for="feature in plan.packages.featureList" :key="feature.id">
										{{ feature.feature_name }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
    </main>
</template>
  