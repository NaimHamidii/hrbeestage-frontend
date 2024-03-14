<template>
    <div class="page_content">
        <div v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-end">
                <div class="m-t-10">
                    <b-button variant="primary" @click="openCreateBlacklistDefinitionModal()">
                        {{ $t('company_blacklist.createblacklist') }}
                    </b-button>
                </div>
            </div>
            <template v-if="company_blacklist && company_blacklist.length">
                <div class="row">
                    <div class="col-md-4" v-for="definition in company_blacklist" :key="definition.job_seeker_blacklist_definition_id">
                        <div class="box">
                            <div class="company-blacklist-page">
                                <div v-if="definition.job_seeker_full_name" class="d-flex flex-column">
                                    <span class="font-weight-bold d-flex justify-content-between">
                                        {{ $t('company_blacklist.jobseekername') }}
                                        <b-button variant="danger" size="sm" @click="openDeleteBlacklistDefinitionModal(definition)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg>
                                        </b-button>
                                    </span>
                                    <span>{{ definition.job_seeker_full_name }}</span>
                                </div>
                                <div v-if="definition.job_seeker_email" class="d-flex flex-column">
                                    <span class="font-weight-bold">{{ $t('company_blacklist.jobseekeremail') }}</span>
                                    <span>{{ definition.job_seeker_email }}</span>
                                </div>
                                <div v-if="definition.job_seeker_phone_number" class="d-flex flex-column">
                                    <span class="font-weight-bold">{{ $t('company_blacklist.jobseekerphonenumber') }}</span>
                                    <span>{{ definition.job_seeker_phone_number }}</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="font-weight-bold">{{ $t('company_blacklist.reason') }}</span>
                                    <span>{{ definition.reason }}</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="font-weight-bold">{{ $t('company_blacklist.numberofusersblacklisted') }}</span>
                                    <span>{{ definition.blacklist.length }}</span>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <template v-if="definition.blacklist.length">
                                        <b-button size="sm" variant="info" @click="openViewUsersModal(definition)">{{ $t('company_blacklist.viewusers') }}</b-button>
                                        <b-button size="sm" class="ml-2" @click="openEditBlacklistDefinitionModal(definition)">{{ $t('btn.edit') }}</b-button>
                                    </template>
                                    <template v-else>
                                        <b-button size="sm" @click="openEditBlacklistDefinitionModal(definition)">{{ $t('btn.edit') }}</b-button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="box">
                    <div class="text-center">
                        {{ $t('company_blacklist.noblacklists') }}
                    </div>
                </div>
            </template>
        </div>

        <b-modal ref="create_blacklist_modal" hide-footer :title="$t('company_blacklist.createblacklist')">
            <div class="create-blacklist-modal" :class="modal_loading ? 'loading' : ''">
                <b-spinner class="modal-spinner" label="Spinning"></b-spinner>
                <form class="form-type-1" @submit.prevent="createBlacklistDefinition">
                    <div class="form__group">
                        <label for="job_seeker_full_name" class="form__label bold">{{ $t('company_blacklist.jobseekername') }}</label>
                        <input class="form__input" type="text" name="job_seeker_full_name" :placeholder="$t('company_blacklist.jobseekername')" v-model="new_blacklist_definition.job_seeker_full_name" />
                    </div>

                    <div class="form__group">
                        <label for="job_seeker_email" class="form__label bold">{{ $t('company_blacklist.jobseekeremail') }}</label>
                        <input class="form__input" type="email" name="job_seeker_email" :placeholder="$t('company_blacklist.jobseekeremail')" v-model="new_blacklist_definition.job_seeker_email" />
                    </div>

                    <div class="form__group">
                        <label for="job_seeker_phone_number" class="form__label bold">{{ $t('company_blacklist.jobseekerphonenumber') }}</label>
                        <input class="form__input" type="phone" name="job_seeker_phone_number" :placeholder="$t('company_blacklist.jobseekerphonenumber')" v-model="new_blacklist_definition.job_seeker_phone_number" />
                    </div>

                    <div class="form__group">
                        <label for="reason" class="form__label bold">{{ $t('company_blacklist.reason') }}</label>
                        <textarea class="form__input" type="text" name="reason" :placeholder="$t('company_blacklist.reason')" v-model="new_blacklist_definition.reason"></textarea>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <span v-if="submitted && hasErrors" class="form-error-notification error">
                            {{ $t('inputError.oneIsRquired') }}
                        </span>
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="outlined_link outline_green" type="submit">{{ $t('btn.savebtn') }}</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </b-modal>

        <b-modal ref="edit_blacklist_modal" hide-footer :title="$t('company_blacklist.editblacklist')">
            <div class="edit-blacklist-modal" :class="modal_loading ? 'loading' : ''">
                <b-spinner class="modal-spinner" label="Spinning"></b-spinner>
                <form v-show="edit_blacklist_modal_part == 1" class="form-type-1" @submit.prevent="getRemovedUsersIfUpdateBlacklistDefinition">
                    <div class="form__group">
                        <label for="job_seeker_full_name" class="form__label bold">{{ $t('company_blacklist.jobseekername') }}</label>
                        <input class="form__input" type="text" name="job_seeker_full_name" :placeholder="$t('company_blacklist.jobseekername')" v-model="selected_blacklist_definition.job_seeker_full_name" />
                    </div>

                    <div class="form__group">
                        <label for="job_seeker_email" class="form__label bold">{{ $t('company_blacklist.jobseekeremail') }}</label>
                        <input class="form__input" type="email" name="job_seeker_email" :placeholder="$t('company_blacklist.jobseekeremail')" v-model="selected_blacklist_definition.job_seeker_email" />
                    </div>

                    <div class="form__group">
                        <label for="job_seeker_phone_number" class="form__label bold">{{ $t('company_blacklist.jobseekerphonenumber') }}</label>
                        <input class="form__input" type="phone" name="job_seeker_phone_number" :placeholder="$t('company_blacklist.jobseekerphonenumber')" v-model="selected_blacklist_definition.job_seeker_phone_number" />
                    </div>

                    <div class="form__group">
                        <label for="reason" class="form__label bold">{{ $t('company_blacklist.reason') }}</label>
                        <textarea class="form__input" type="text" name="reason" :placeholder="$t('company_blacklist.reason')" v-model="selected_blacklist_definition.reason"></textarea>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <span v-if="submitted && hasErrors" class="form-error-notification error">
                            {{ $t('inputError.oneIsRquired') }}
                        </span>
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="outlined_link outline_green" type="submit">{{ $t('button.update') }}</button>
                            </li>
                        </ul>
                    </div>
                </form>
                <form v-show="edit_blacklist_modal_part == 2" class="form-type-1" @submit.prevent="updateBlacklistDefinition">
                    <span>{{ $t('company_blacklist.removeuserseditwarning') }}</span>

                    <ul class="removed_users_container mt-2 mb-4 font-weight-bold">
                        <li v-for="user in removed_users_if_update_blacklist_definition">{{ user.name }} {{ user.surname }}</li>
                    </ul>

                    <div class="form__group">
                        <b-form-checkbox class="m-t-10" name="create_new_blacklist_for_removed_users" v-model="create_new_blacklist_for_removed_users" switch>
                            {{ $t('company_blacklist.createnewblacklistforremovedusers') }}
                        </b-form-checkbox>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <span v-if="submitted && hasErrors" class="form-error-notification error">
                            {{ $t('inputError.oneIsRquired') }}
                        </span>
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="outlined_link outline_green" type="submit">{{ $t('button.update') }}</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </b-modal>

        <b-modal ref="delete_blacklist_modal" hide-footer :title="$t('company_blacklist.deleteblacklist')">
            <div class="delete-blacklist-modal" :class="modal_loading ? 'loading' : ''">
                <b-spinner class="modal-spinner" label="Spinning"></b-spinner>
                <form v-show="selected_blacklist_definition_users.length" @submit.prevent="deleteBlacklistDefinition">
                    <span>{{ $t('company_blacklist.removeusersdeletewarning') }}</span>

                    <ul class="removed_users_container mt-2 mb-4 font-weight-bold">
                        <li v-for="user in selected_blacklist_definition_users">{{ user.name }} {{ user.surname }}</li>
                    </ul>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <span v-if="submitted && hasErrors" class="form-error-notification error">
                            {{ $t('inputError.oneIsRquired') }}
                        </span>
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="outlined_link outline_danger" type="submit">{{ $t('btn.delete') }}</button>
                            </li>
                        </ul>
                    </div>
                </form>
                <form v-show="!selected_blacklist_definition_users.length" class="form-type-1" @submit.prevent="deleteBlacklistDefinition">
                    <span>{{ $t('alerts.are_you_sure') }}</span>

                    <div class="modal_footer_buttons mt-4">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul class="bootstrap_inline_buttons">
                            <li>
                                <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="outlined_link outline_danger" type="submit">{{ $t('btn.delete') }}</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </b-modal>

        <b-modal ref="view_users_modal" hide-footer :title="$t('company_blacklist.usersblacklisted')">
            <div class="view-users-modal" :class="modal_loading ? 'loading' : ''">
                <b-spinner class="modal-spinner" label="Spinning"></b-spinner>
                <ul v-if="this.selected_blacklist_definition_users.length" class="view_users_container mt-2 font-weight-bold">
                    <li v-for="jobSeeker in this.selected_blacklist_definition_users">
                        {{ jobSeeker.name }} {{ jobSeeker.surname }}
                        <b-button class="ml-2" variant="danger" size="sm" v-b-tooltip.hover :title="$t('btn.delete')" @click="removeUserFromBlacklist(selected_blacklist_definition.job_seeker_blacklist_definition_id, jobSeeker.job_seeker_id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </b-button>
                    </li>
                </ul>
                <span v-else>{{ $t('company_blacklist.noblacklistedusers') }}</span>
            </div>
        </b-modal>
    </div>
</template>

<script>
import search_blacklisted_candidates from '@company_components/jobs/data-search'
export default {
    computed: {
        company_blacklist: function () {
            if (this.$store.getters['company_data/recruitment/blacklist/get_blacklist']) {
                return this.$store.getters['company_data/recruitment/blacklist/get_blacklist']
            }
        },
    },
    watch: {
        company_blacklist: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            component_loading: true,
            spinner_updating: false,
            modal_loading: false,
            submitted: false,
            hasErrors: false,

            new_blacklist_definition: {},
            selected_blacklist_definition: {},
            selected_blacklist_definition_users: [],
            removed_users_if_update_blacklist_definition: [],
            create_new_blacklist_for_removed_users: false,
            edit_blacklist_modal_part: 1,
        }
    },
    methods: {
        openCreateBlacklistDefinitionModal() {
            this.closeModal()
            this.new_blacklist_definition = {}
            this.$refs.create_blacklist_modal.show()
        },
        openEditBlacklistDefinitionModal(definition) {
            this.closeModal()
            this.selectBlacklistDefinition(definition)
            this.$refs.edit_blacklist_modal.show()
        },
        openDeleteBlacklistDefinitionModal(definition) {
            this.closeModal()
            this.selectBlacklistDefinition(definition)
            this.$refs.delete_blacklist_modal.show()
        },
        openViewUsersModal(definition) {
            this.closeModal()
            this.selectBlacklistDefinition(definition)
            this.$refs.view_users_modal.show()
        },
        selectBlacklistDefinition(definition) {
            this.selected_blacklist_definition = {
                job_seeker_blacklist_definition_id: definition.job_seeker_blacklist_definition_id,
                job_seeker_full_name: definition.job_seeker_full_name,
                job_seeker_email: definition.job_seeker_email,
                job_seeker_phone_number: definition.job_seeker_phone_number,
                reason: definition.reason,
            }
            this.selected_blacklist_definition_users = []
            for (const item of definition.blacklist) {
                this.selected_blacklist_definition_users.push(item.job_seeker)
            }
        },
        closeModal() {
            this.modal_loading = false
            this.$refs.create_blacklist_modal.hide()
            this.$refs.edit_blacklist_modal.hide()
            this.$refs.delete_blacklist_modal.hide()
            this.$refs.view_users_modal.hide()
            this.selected_blacklist_definition = {}
            this.edit_blacklist_modal_part = 1
            this.removed_users_if_update_blacklist_definition = []
            this.removed_users_if_delete_blacklist_definition = []
        },
        getRemovedUsersIfUpdateBlacklistDefinition() {
            this.submitted = true

            let { job_seeker_full_name, job_seeker_email, job_seeker_phone_number, reason } = this.selected_blacklist_definition

            if (job_seeker_full_name && !job_seeker_full_name.replace(/\s/g, '').length) job_seeker_full_name = null
            if (job_seeker_email && !job_seeker_email.replace(/\s/g, '').length) job_seeker_email = null
            if (job_seeker_phone_number && !job_seeker_phone_number.replace(/\s/g, '').length) job_seeker_phone_number = null

            if (!job_seeker_full_name && !job_seeker_email && !job_seeker_phone_number) {
                this.hasErrors = true
                return
            }

            this.hasErrors = false
            this.spinner_loading = true

            this.$store.dispatch('company_data/recruitment/blacklist/get_removed_users_if_update_company_blacklist_definition', this.selected_blacklist_definition).then((response) => {
                if (response.status == 200) {
                    if (response.data.length) {
                        this.removed_users_if_update_blacklist_definition = response.data
                        this.edit_blacklist_modal_part = 2
                    } else {
                        this.updateBlacklistDefinition()
                    }
                } else {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                }

                this.spinner_loading = false
            })
        },
        removeUserFromBlacklist(blacklistDefinitionId, jobSeekerId) {
            this.modal_loading = true

            this.$store.dispatch('company_data/recruitment/blacklist/remove_user_from_blacklist', { job_seeker_blacklist_definition_id: blacklistDefinitionId, job_seeker_id: jobSeekerId }).then((response) => {
                if (response.status == 200) {
                    this.$toast.success(this.$t('company_blacklist.userremoved'), 'Success', { timeut: 3000 })
                } else {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                }

                this.selected_blacklist_definition_users = this.selected_blacklist_definition_users.filter((user) => {
                    return user.job_seeker_id != jobSeekerId
                })

                this.modal_loading = false
            })
        },
        createBlacklistDefinition() {
            this.submitted = true

            let { job_seeker_full_name, job_seeker_email, job_seeker_phone_number } = this.new_blacklist_definition

            if (job_seeker_full_name && !job_seeker_full_name.replace(/\s/g, '').length) job_seeker_full_name = null
            if (job_seeker_email && !job_seeker_email.replace(/\s/g, '').length) job_seeker_email = null
            if (job_seeker_phone_number && !job_seeker_phone_number.replace(/\s/g, '').length) job_seeker_phone_number = null

            if (!job_seeker_full_name && !job_seeker_email && !job_seeker_phone_number) {
                this.hasErrors = true
                return
            }

            this.hasErrors = false
            this.modal_loading = true

            this.$store.dispatch('company_data/recruitment/blacklist/create_company_blacklist_definition', this.new_blacklist_definition).then((response) => {
                if (response.status == 200) {
                    this.$toast.success(this.$t('alerts.successful_data_saved'), 'Success', { timeut: 3000 })
                    this.closeModal()
                } else {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                }
                this.modal_loading = false
            })
        },
        updateBlacklistDefinition() {
            this.submitted = true

            let { job_seeker_full_name, job_seeker_email, job_seeker_phone_number } = this.selected_blacklist_definition

            if (job_seeker_full_name && !job_seeker_full_name.replace(/\s/g, '').length) job_seeker_full_name = null
            if (job_seeker_email && !job_seeker_email.replace(/\s/g, '').length) job_seeker_email = null
            if (job_seeker_phone_number && !job_seeker_phone_number.replace(/\s/g, '').length) job_seeker_phone_number = null

            if (!job_seeker_full_name && !job_seeker_email && !job_seeker_phone_number) {
                this.hasErrors = true
                return
            }

            this.hasErrors = false
            this.modal_loading = true

            this.$store.dispatch('company_data/recruitment/blacklist/update_company_blacklist_definition', { ...this.selected_blacklist_definition, create_new_blacklist_for_removed_users: this.create_new_blacklist_for_removed_users ? 1 : 0 }).then((response) => {
                if (response.status == 200) {
                    this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                    this.closeModal()
                } else {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                }
                this.modal_loading = false
            })
        },
        deleteBlacklistDefinition() {
            this.modal_loading = true

            this.$store.dispatch('company_data/recruitment/blacklist/delete_company_blacklist_definition', this.selected_blacklist_definition.job_seeker_blacklist_definition_id).then((response) => {
                if (response.status == 200) {
                    this.$toast.success(this.$t('alerts.successful_data_deleted'), 'Success', { timeut: 3000 })
                    this.closeModal()
                } else {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                }

                this.modal_loading = false
            })
        },
    },
    created() {
        this.$store.dispatch('company_data/recruitment/blacklist/get_company_blacklist').then((response) => {
            this.component_loading = false
        })
    },
    components: {
        'search-candidates': search_blacklisted_candidates,
    },
}
</script>
<style lang="scss">
.company-blacklist-page {
    div {
        font-size: 14px;
        margin-bottom: 10px;
    }
}
.create-blacklist-modal,
.edit-blacklist-modal,
.delete-blacklist-modal,
.view-users-modal {
    .modal-spinner {
        display: none;
        position: absolute;
        left: calc(50% - 12.5px);
        top: calc(50% - 12.5px);
        z-index: 1;
        width: 25px !important;
        height: 25px !important;
    }
}
.create-blacklist-modal.loading,
.edit-blacklist-modal.loading,
.delete-blacklist-modal.loading,
.view-users-modal.loading {
    .modal-spinner {
        display: block;
    }

    form {
        opacity: 0.25;
        pointer-events: none;
    }

    .view_users_container {
        opacity: 0.25;
        pointer-events: none;
    }
}
.view_users_container {
    li {
        margin-bottom: 10px;
    }
}
</style>
