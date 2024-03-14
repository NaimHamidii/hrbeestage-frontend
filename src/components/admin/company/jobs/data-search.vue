<template>
    <div class="header_search_filter form-type-1">
        <template v-if="searchType == 'company_job_search'">
            <input type="text" class="form__input" v-model="searchQuery" :placeholder="$t('company_jobs_page.searchjobplaceholder')" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'application_candidate_search'">
            <input type="text" class="form__input" v-model="searchQuery" :placeholder="$t('company_jobs_page.searchcandidateplaceholder')" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'application_search_interview_candidate'">
            <input type="text" class="form__input" v-model="searchQuery" :placeholder="$t('company_jobs_page.searchcandidateplaceholder')" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'blacklist-search'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search blacklisted candidate name & surname" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'interviews-search'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search with name & surname" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'employee_vacation_search'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'company_employee_search'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
        <template v-if="searchType == 'employee_work_schedule_search'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>

        <template v-if="searchType == 'employee_wages_list'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>

        <template v-if="searchType == 'generated_wages_employee'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>

        <template v-if="searchType == 'bonuses_employee'">
            <input type="text" class="form__input" v-model="searchQuery" placeholder="Search employee" @keyup.enter="apply_search" />
            <div class="delete_search" @click="init_reset" v-if="searchQuery.length > 3">
                <img src="/images/close.svg" />
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        searchType: {
            type: String,
            required: true,
        },
    },
    computed: {},
    watch: {},
    data() {
        return {
            searchQuery: '',
        }
    },
    methods: {
        apply_search() {
            if (this.searchType == 'company_job_search') {
                return this.$emit('searchJobs', this.searchQuery)
            } else if (this.searchType == 'application_candidate_search') {
                return this.$emit('searchCandidates', this.searchQuery)
            } else if (this.searchType == 'blacklist-search') {
                return this.$emit('searchBlacklistedCandidates', this.searchQuery)
            } else if (this.searchType == 'interviews-search') {
                return this.$emit('searchInterviews', this.searchQuery)
            } else if (this.searchType == 'employee_vacation_search') {
                return this.$emit('searchEmployee', this.searchQuery)
            } else if (this.searchType == 'company_employee_search') {
                return this.$emit('searchEmployee', this.searchQuery)
            } else if (this.searchType == 'employee_work_schedule_search') {
                return this.$emit('searchEmployee', this.searchQuery)
            } else if (this.searchType == 'application_search_interview_candidate') {
                return this.$emit('searchInterviewCandidates', this.searchQuery)
            } else if (this.searchType == 'employee_wages_list') {
                return this.$emit('searchEmployeeInWages', this.searchQuery)
            } else if (this.searchType == 'generated_wages_employee') {
                return this.$emit('searchEmployeeInGeneratedWagesList', this.searchQuery)
            } else if (this.searchType == 'bonuses_employee') {
                return this.$emit('searchEmployeeInBonuses', this.searchQuery)
            }
        },
        init_reset: function () {
            this.searchQuery = ''
            this.$emit('reset_search')
        },
    },
}
</script>

<style lang="scss" scoped>
.header_search_filter {
    input {
        height: 45px !important;
        border: none;
        &:focus {
            border: none !important;
            box-shadow: 1px 2px 6px 2px #e2e1e1;
        }
    }
    .delete_search {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        img {
            width: 10px;
            height: 10px;
        }
    }
}
</style>
