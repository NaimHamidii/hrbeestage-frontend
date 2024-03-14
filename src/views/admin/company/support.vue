<template>
    <div class="page_content">
        <div class="boxi">
            <div v-if="supports.length > 0">
                <div v-for="item in supports">
                    <support-section :title="item.title" :items="item.items" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SupportSection from '@general_components/support-section';   

    export default {
        components: {
            SupportSection
        },

        data() {
            return {
                component_loading: false,
            }
        },

        computed:{
            supports(){
                return this.$store.getters['superadmin/supports/get_supports']
            },
        },

        watch:{
            supports(newvalue){
                return newvalue
            },
        },

        methods:{
            fetchData: function() {
                this.component_loading = true
                this.$store.dispatch("superadmin/supports/get_supports")
                    .then(response => {
                        this.component_loading = false 
                    })
            },
        },

        created() {
            this.fetchData();
        },
    }
</script>

