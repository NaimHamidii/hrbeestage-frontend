<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader" >
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="all_company_events.total > '0'">
                <div class="row">
                    <div class="col-md-12" v-for="event_item in all_company_events.data" :key="event_item.id">
                        <div v-if="event_item.invited.split(',').map(item => item.trim()).includes(emp_id.toString())" class="boxi m-t-20">
                            <div class="event">
                                <div class="info">
                                    <div class="infoitem">
                                        <p>{{$t('feeds_module.date')}}: <span>{{event_item.date | moment("DD/MM/YYYY")}}</span></p>
                                    </div>
                                    <div class="infoitem">
                                        <p>{{$t('feeds_module.location')}}: <span>{{event_item.location}}</span></p>
                                    </div>
                                    <!-- <div class="infoitem">
                                        <p>{{$t('feeds_module.invited')}}: <span>{{event_item.invited}}</span></p>
                                    </div> -->
                                </div>
                                <div class="content">
                                    <p>
                                        {{ event_item.note }}
                                    </p>
                                </div>
                                <hr />
                                <div>
                                    <div v-if="event_item.invitations.find(item => item.employee_id.toString() === emp_id.toString()).status === 'send_invitation'">
                                        <button @click="changeStatus('Approved', event_item.invitations.find(item => item.employee_id.toString() === emp_id.toString()).id)">Approve</button>
                                        <button @click="changeStatus('Rejected', event_item.invitations.find(item => item.employee_id.toString() === emp_id.toString()).id)">Reject</button>
                                    </div>
                                    <div v-if="event_item.invitations.find(item => item.employee_id.toString() === emp_id.toString()).status === 'Approved'">
                                        <p style="font-size: 13px; margin: 0">You approved this invitation</p>
                                    </div>
                                    <div v-if="event_item.invitations.find(item => item.employee_id.toString() === emp_id.toString()).status === 'Rejected'">
                                        <p style="font-size: 13px; margin: 0">You rejected this invitation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <b-pagination v-if="all_company_events.total > all_company_events.per_page"
                    align="center" 
                    @change="loadAnotherPage"
                    :total-rows="all_company_events.total" 
                    v-model="all_company_events.current_page" 
                    :per-page="all_company_events.per_page">
                </b-pagination>
            </template>
            <template v-else>
                <br><div class="box">
                    <div class="text-center">
                        {{$t('feeds_module.noevents')}}
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        inject: {
            $validator: '$validator'
        },

        components: {
            Datepicker
        },

        computed: {
            all_company_events : function() {                             
                if(this.$store.getters['employee_data/companysettings/getEvents']){
                    return this.$store.getters['employee_data/companysettings/getEvents']
                }                
            }
        },
        watch: {
            all_company_events: function(new_value){                 
                return new_value    
            }
        },
        
        data(){
            return{
                component_loading: false,
                emp_id: localStorage.getItem('auth.user_id')
            }
        },

        methods: {
            get_company_events: function(){
                this.component_loading = true
                this.$store.dispatch("employee_data/companysettings/get_company_events")
                .then(response => {        
                    this.component_loading = false  
                })
            },

            loadAnotherPage: function(page_number_to) {
                this.component_loading = true
                setTimeout(() => {
                    this.$store.dispatch("employee_data/companysettings/get_company_events_with_page", page_number_to)
                    .then(response => {     
                        this.component_loading = false       
                    })
                }, 200);
            },

            changeStatus: function(status, id) {
                this.component_loading = true
                const data = {
                    id: id,
                    status: status
                }
                this.$store.dispatch("employee_data/companysettings/updateStatusOfEventInvitation", data)
                .then(response => {     
                    this.$store.dispatch("employee_data/companysettings/get_company_events")
                    .then(response => {        
                        this.component_loading = false  
                    })     
                })
            }
        },

        created(){
            this.get_company_events()
        }

    }
</script>