<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="boxi">
                <div class="textinBox">
                    <h4 class="form-title text-center">
                        {{ $t('account_settings.businessorganogram') }}
                    </h4>
                    <ul class="inlineListinJobDetails text-center">
                        <li @click="showCreateDepartments" :class="create_department ? 'activeli' : ''">{{ $t('account_settings.createdepartment') }}</li>
                        <li @click="showViewPositions" :class="view_positions ? 'activeli' : ''">{{ $t('account_settings.createposition') }}</li>
                    </ul>
                    <hr />
                    <template v-if="create_department">
                        <form class="form-type-1" @submit.prevent="add_new_department">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="department_name" class="form__label2 bold">{{ $t('account_settings.departmentname') }} <span class="required">(*)</span></label>
                                        <input type="text" class="form__input" :placeholder="$t('account_settings.departmentname')" name="department_name" id="department_name" v-model="department_name" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="department_parent_id" class="form__label2 bold">{{ $t('account_settings.belongstodepartment') }}</label>
                                        <multiselect id="department_parent_id" name="department_parent_id" v-model="department_parent_id" :options="department_parent_id_options" :placeholder="$t('account_settings.belongstodepartment')" label="name" track-by="value" @input="onDepartmentParentIdSelect"></multiselect>
                                    </div>
                                </div>
                                <div class="col-md-4" v-if="department_parent_id && department_parent_id.value && department_parent_id_sub_options">
                                    <div class="form__group">
                                        <label for="department_parent_id_sub" class="form__label2 bold">{{ $t('account_settings.belongstosubdepartment') }}</label>
                                        <multiselect id="department_parent_id_sub" name="department_parent_id_sub" v-model="department_parent_id_sub" :options="department_parent_id_sub_options" :placeholder="$t('account_settings.belongstosubdepartment')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="department_class" class="form__label2 bold">{{ $t('account_settings.departmentclass') }}</label>
                                        <multiselect id="department_class" name="department_class" v-model="department_class" :options="department_class_options" :placeholder="$t('account_settings.departmentclass')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="report_to" class="form__label2 bold">{{ $t('account_settings.reportto') }}</label>
                                        <multiselect id="report_to" name="report_to" v-model="report_to" :options="report_to_options" :placeholder="$t('account_settings.reportto')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-center">
                                        <button type="submit" class="site_btn btn_blue">
                                            {{ $t('account_settings.adddepartment') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </template>
                    <template v-if="view_positions">
                        <form class="form-type-1" @submit.prevent="add_new_position">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="position_name" class="form__label2 bold">{{ $t('account_settings.positionname') }} <span class="required">(*)</span></label>
                                        <input type="text" class="form__input" :placeholder="$t('account_settings.positionname')" name="position_name" id="position_name" v-model="position_name" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }} <span class="required">(*)</span></label>
                                        <multiselect id="department" name="department" v-model="department" :options="department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form__group">
                                        <label for="department" class="form__label2 bold">Head of Department <span class="required">(*)</span></label>
                                        <b-form-checkbox v-model="position_head_of_department" @change="togglePositionHeadOfDepartment" class="m-t-20">
                                            Head of Department
                                        </b-form-checkbox>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form__group">
                                        <label for="job_description" class="form__label2 bold">{{ $t('account_settings.job_description') }}</label>
                                        <vue-editor class="vueeditor" :editorToolbar="customToolbar" v-model="job_description" name="job_description" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-center mt-3">
                                        <button type="submit" class="site_btn btn_blue">
                                            {{ $t('account_settings.addposition') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </template>
                </div>
            </div>

            <div class="boxi m-t-20">
                <h4 class="form-title text-center">{{ $t('emp_pages.departments') }}</h4>
                <template v-if="company_departments && company_departments.base.filter((department) => department.class === 'A').length != 0">
                    <div class="departments-flex text-center">
                        <div :class="selected_department.id === department.id ? 'departments-item-active' : 'departments-item'" v-for="department in company_departments.base.filter((department) => department.class === 'A')" :key="department.id" @click="selectDepartment(department)">
                            {{ department.name }}
                            <template v-if="actions_department && selected_department.id === department.id">
                                <hr class="dep-hr" />
                                <div class="departments-actions text-center">
                                    <button @click="openEditDepartmentModal(department)">
                                        {{ $t('account_settings.edit') }}
                                    </button>
                                    <button v-if="selected_department_positions.length === 0" @click="delete_department(department.id)">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                    <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="company_departments && company_departments.base.filter((department) => department.class === 'B').length != 0">
                    <div class="departments-flex text-center">
                        <div :class="selected_department.id === department.id ? 'departments-item-active' : 'departments-item'" v-for="department in company_departments.base.filter((department) => department.class === 'B')" :key="department.id" @click="selectDepartment(department)">
                            {{ department.name }}
                            <template v-if="actions_department && selected_department.id === department.id">
                                <hr class="dep-hr" />
                                <div class="departments-actions text-center">
                                    <button @click="openEditDepartmentModal(department)">
                                        {{ $t('account_settings.edit') }}
                                    </button>
                                    <button v-if="selected_department_positions.length === 0" @click="delete_department(department.id)">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                    <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="company_departments && company_departments.base.filter((department) => department.class === 'C').length != 0">
                    <div class="departments-flex text-center">
                        <div :class="selected_department.id === department.id ? 'departments-item-active' : 'departments-item'" v-for="department in company_departments.base.filter((department) => department.class === 'C')" :key="department.id" @click="selectDepartment(department)">
                            {{ department.name }}
                            <template v-if="actions_department && selected_department.id === department.id">
                                <hr class="dep-hr" />
                                <div class="departments-actions text-center">
                                    <button @click="openEditDepartmentModal(department)">
                                        {{ $t('account_settings.edit') }}
                                    </button>
                                    <button v-if="selected_department_positions.length === 0" @click="delete_department(department.id)">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                    <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="company_departments && company_departments.base.filter((department) => department.class === 'D').length != 0">
                    <div class="departments-flex text-center">
                        <div :class="selected_department.id === department.id ? 'departments-item-active' : 'departments-item'" v-for="department in company_departments.base.filter((department) => department.class === 'D')" :key="department.id" @click="selectDepartment(department)">
                            {{ department.name }}
                            <template v-if="actions_department && selected_department.id === department.id">
                                <hr class="dep-hr" />
                                <div class="departments-actions text-center">
                                    <button @click="openEditDepartmentModal(department)">
                                        {{ $t('account_settings.edit') }}
                                    </button>
                                    <button v-if="selected_department_positions.length === 0" @click="delete_department(department.id)">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                    <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="company_departments && company_departments.base.filter((department) => department.class === 'E').length != 0">
                    <div class="departments-flex text-center">
                        <div :class="selected_department.id === department.id ? 'departments-item-active' : 'departments-item'" v-for="department in company_departments.base.filter((department) => department.class === 'E')" :key="department.id" @click="selectDepartment(department)">
                            {{ department.name }}
                            <template v-if="actions_department && selected_department.id === department.id">
                                <hr class="dep-hr" />
                                <div class="departments-actions text-center">
                                    <button @click="openEditDepartmentModal(department)">
                                        {{ $t('account_settings.edit') }}
                                    </button>
                                    <button v-if="selected_department_positions.length === 0" @click="delete_department(department.id)">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                    <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="company_departments && company_departments.base.filter((department) => department.class === '' || department.class === null || department.class === undefined).length != 0">
                    <div class="departments-flex text-center">
                        <div :class="selected_department.id === department.id ? 'departments-item-active' : 'departments-item'" v-for="department in company_departments.base.filter((department) => department.class === '' || department.class === null || department.class === undefined)" :key="department.id" @click="selectDepartment(department)">
                            {{ department.name }}
                            <template v-if="actions_department && selected_department.id === department.id">
                                <hr class="dep-hr" />
                                <div class="departments-actions text-center">
                                    <button @click="openEditDepartmentModal(department)">
                                        {{ $t('account_settings.edit') }}
                                    </button>
                                    <button v-if="selected_department_positions.length === 0" @click="delete_department(department.id)">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                    <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                        {{ $t('account_settings.delete') }}
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <hr />
                </template>
            </div>

            <div v-if="selected_department.selected && selected_department.subdepartments.length" class="boxi m-t-20">
                <h4 class="form-title text-center">{{ $t('emp_pages.subdepartments') }}</h4>
                <div class="departments-flex text-center">
                    <div :class="selected_sub_department.id === sub_item.id ? 'departments-item-active' : 'departments-item'" v-for="sub_item in selected_department.subdepartments" :key="sub_item.id" @click="selectDepartment(sub_item)">
                        {{ sub_item.name }}
                        <template v-if="actions_department && selected_sub_department.id === sub_item.id">
                            <hr class="dep-hr" />
                            <div class="departments-actions text-center">
                                <button @click="openEditDepartmentModal(sub_item)">
                                    {{ $t('account_settings.edit') }}
                                </button>
                                <button v-if="selected_department_positions.length === 0" @click="delete_department(sub_item.id)">
                                    {{ $t('account_settings.delete') }}
                                </button>
                                <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                    {{ $t('account_settings.delete') }}
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <div v-if="selected_sub_department.selected && selected_sub_department.subdepartments.length" class="boxi m-t-20">
                <h4 class="form-title text-center">{{ $t('emp_pages.subsubdepartments') }}</h4>
                <div class="departments-flex text-center">
                    <div :class="selected_sub_sub_department.id === sub_item.id ? 'departments-item-active' : 'departments-item'" v-for="sub_item in selected_sub_department.subdepartments" :key="sub_item.id" @click="selectDepartment(sub_item)">
                        {{ sub_item.name }}
                        <template v-if="actions_department && selected_sub_sub_department.id === sub_item.id">
                            <hr class="dep-hr" />
                            <div class="departments-actions text-center">
                                <button @click="openEditDepartmentModal(sub_item)">
                                    {{ $t('account_settings.edit') }}
                                </button>
                                <button v-if="selected_department_positions.length === 0" @click="delete_department(sub_item.id)">
                                    {{ $t('account_settings.delete') }}
                                </button>
                                <button v-if="selected_department_positions.length !== 0" @click="tryToDelete()">
                                    {{ $t('account_settings.delete') }}
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <div v-if="selected_department.selected" class="boxi m-t-20">
                <h4 class="form-title text-center">{{ $t('emp_pages.positions') }}</h4>
                <template v-if="selected_department_positions.length != 0">
                    <div class="departments-flex text-center">
                        <div v-for="department in selected_department_positions">
                            <h4 class="form-title text-center">{{ department.department_name }}</h4>
                            <div :class="selected_position_id === position.id ? 'departments-item-active' : 'departments-item'" v-for="position in department.positions" :key="position.id" @click="openActionsPosition(position.id)">
                                {{ position.name }}
                                <template v-if="actions_position && selected_position_id === position.id">
                                    <hr class="dep-hr" />
                                    <div class="departments-actions text-center">
                                        <button @click="edit_position(position.id)">
                                            {{ $t('account_settings.edit') }}
                                        </button>
                                        <button @click="delete_position(position.id)">
                                            {{ $t('account_settings.delete') }}
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="textinBox text-center">
                        <h4>{{ $t('account_settings.noposition') }}</h4>
                    </div>
                </template>
            </div>

            <div class="profile_edit_modals" v-if="modal_department">
                <div class="modal_item">
                    <div class="box">
                        <div class="close_modal" @click="modal_department = false">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('account_settings.updatedepartment') }}</h4>
                                <hr />
                                <form class="form-type-1" @submit.prevent="update_department">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="edit_department_name" class="form__label2 bold">{{ $t('account_settings.departmentname') }} <span class="required">(*)</span></label>
                                                <input type="text" class="form__input" :placeholder="$t('account_settings.departmentname')" name="edit_department_name" id="edit_department_name" v-model="edit_department_name" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="edit_department_parent" class="form__label2 bold">{{ $t('account_settings.belongstodepartment') }}</label>
                                                <multiselect id="edit_department_parent" name="edit_department_parent" v-model="edit_department_parent" :options="edit_department_parent_options" :placeholder="$t('account_settings.belongstodepartment')" label="name" track-by="value" @input="onEditDepartmentParentIdSelect"></multiselect>
                                            </div>
                                        </div>
                                        <div class="col-md-4" v-if="edit_department_parent">
                                            <div class="form__group">
                                                <label for="edit_department_parent_sub" class="form__label2 bold">{{ $t('account_settings.belongstosubdepartment') }}</label>
                                                <multiselect id="edit_department_parent_sub" name="edit_department_parent_sub" v-model="edit_department_parent_sub" :options="edit_department_parent_sub_options" :placeholder="$t('account_settings.belongstosubdepartment')" label="name" track-by="value"></multiselect>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="edit_department_class" class="form__label2 bold">{{ $t('account_settings.departmentclass') }}</label>
                                                <multiselect id="edit_department_class" name="edit_department_class" v-model="edit_department_class" :options="edit_department_class_options" :placeholder="$t('account_settings.departmentclass')" label="name" track-by="value"></multiselect>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="edit_report_to" class="form__label2 bold">{{ $t('account_settings.reportto') }}</label>
                                                <multiselect id="edit_report_to" name="edit_report_to" v-model="edit_report_to" :options="edit_report_to_options" :placeholder="$t('account_settings.reportto')" label="name" track-by="value"></multiselect>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="text-center">
                                                <button type="submit" class="site_btn btn_blue">
                                                    {{ $t('account_settings.updatedepartment') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile_edit_modals" v-if="modal_position">
                <div class="modal_item">
                    <div class="boxi">
                        <div class="close_modal" @click="modal_position = false">
                            <img src="/images/close.svg" width="20px" />
                        </div>
                        <div class="container m-t-b">
                            <div class="addExperienceSection">
                                <h4>{{ $t('account_settings.updateposition') }}</h4>
                                <hr />
                                <form class="form-type-1" @submit.prevent="update_position">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="edit_position_name" class="form__label2 bold">{{ $t('account_settings.positionname') }} <span class="required">(*)</span></label>
                                                <input type="text" class="form__input" :placeholder="$t('account_settings.positionname')" name="edit_position_name" id="edit_position_name" v-model="edit_position_name" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="edit_department" class="form__label2 bold">{{ $t('account_settings.choosedepartment') }} <span class="required">(*)</span></label>
                                                <multiselect id="edit_department" name="edit_department" v-model="edit_department" :options="edit_department_options" :placeholder="$t('account_settings.choosedepartment')" label="name" track-by="value"></multiselect>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form__group">
                                                <label for="department" class="form__label2 bold">Head of Department <span class="required">(*)</span></label>
                                                <b-form-checkbox v-model="edit_position_head_of_department" @change="editTogglePositionHeadOfDepartment" class="m-t-20">
                                                    Head of Department
                                                </b-form-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form__group">
                                                <label for="edit_job_description" class="form__label2 bold">{{ $t('account_settings.job_description') }}</label>
                                                <vue-editor class="vueeditor" :editorToolbar="customToolbar" v-model="edit_job_description" name="edit_job_description" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="text-center mt-3">
                                                <button type="submit" class="site_btn btn_blue">
                                                    {{ $t('account_settings.updateposition') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
    components: {
        VueEditor,
    },

    computed: {
        company_departments: function () {
            return this.$store.getters['company_data/departments/get']
        },
    },

    watch: {
        company_departments: function (new_value) {
            this.department_parent_id_options = new_value.all
                .filter((department) => !department.isSubDepartment)
                .map((department) => ({
                    name: department.name,
                    value: department.id,
                }))
            this.department_options = new_value.all.map((department) => ({
                name: department.name,
                value: department.id,
            }))
            return new_value
        },
    },

    data() {
        return {
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ],

            component_loading: true,
            submitted: false,

            create_department: false,
            view_positions: false,

            department_name: '',
            department_parent_id: '',
            department_parent_id_sub: '',
            department_parent_id_options: [],
            department_parent_id_sub_options: [],
            department_class: [],
            department_class_options: [
                {
                    name: 'A',
                    value: 'A',
                },
                {
                    name: 'B',
                    value: 'B',
                },
                {
                    name: 'C',
                    value: 'C',
                },
                {
                    name: 'D',
                    value: 'D',
                },
                {
                    name: 'E',
                    value: 'E',
                },
            ],
            report_to: [],
            report_to_options: [
                {
                    name: 'A',
                    value: 'A',
                },
                {
                    name: 'B',
                    value: 'B',
                },
                {
                    name: 'C',
                    value: 'C',
                },
                {
                    name: 'D',
                    value: 'D',
                },
                {
                    name: 'E',
                    value: 'E',
                },
            ],

            edit_department_name: '',
            edit_department_parent: [],
            edit_department_parent_sub: [],
            edit_department_parent_options: [],
            edit_department_parent_sub_options: [],
            edit_department_class: [],
            edit_department_class_options: [
                {
                    name: 'A',
                    value: 'A',
                },
                {
                    name: 'B',
                    value: 'B',
                },
                {
                    name: 'C',
                    value: 'C',
                },
                {
                    name: 'D',
                    value: 'D',
                },
                {
                    name: 'E',
                    value: 'E',
                },
            ],
            edit_report_to: [],
            edit_report_to_options: [
                {
                    name: 'A',
                    value: 'A',
                },
                {
                    name: 'B',
                    value: 'B',
                },
                {
                    name: 'C',
                    value: 'C',
                },
                {
                    name: 'D',
                    value: 'D',
                },
                {
                    name: 'E',
                    value: 'E',
                },
            ],

            position_name: '',
            position_head_of_department: false,
            department: [],
            department_options: [],
            job_description: '',

            edit_position_name: '',
            edit_position_head_of_department: false,
            edit_department: [],
            edit_department_options: [],
            edit_job_description: '',

            selected_department: {},
            selected_sub_department: {},
            selected_sub_sub_department: {},

            actions_department: false,
            actions_position: false,

            selected_position_id: '',

            modal_department: false,
            modal_position: false,
        }
    },

    methods: {
        onDepartmentParentIdSelect() {
            const departmentParentIdSubOptions = []
            for (const department of this.company_departments.base) {
                if (department.id == this.department_parent_id.value) {
                    for (const subdepartment of department.subdepartments) {
                        departmentParentIdSubOptions.push({
                            name: subdepartment.name,
                            value: subdepartment.id,
                        })
                    }
                }
            }
            this.department_parent_id_sub_options = departmentParentIdSubOptions
        },

        togglePositionHeadOfDepartment: function (checked) {
            if (checked) {
                this.position_head_of_department = true
            } else {
                this.position_head_of_department = false
            }
        },
        
        editTogglePositionHeadOfDepartment: function (checked) {
            if (checked) {
                this.edit_position_head_of_department = true
            } else {
                this.edit_position_head_of_department = false
            }
        },

        onEditDepartmentParentIdSelect() {
            const editDepartmentParentIdSubOptions = []

            let shouldClearSubDepartmentValue = true
            if (this.edit_department_parent) {
                for (const department of this.company_departments.base) {
                    if (department.id == this.edit_department_parent.value) {
                        for (const subdepartment of department.subdepartments) {
                            editDepartmentParentIdSubOptions.push({
                                name: subdepartment.name,
                                value: subdepartment.id,
                            })

                            if (this.edit_department_parent_sub && this.edit_department_parent_sub.value == subdepartment.id) shouldClearSubDepartmentValue = false
                        }
                    }
                }
            }

            if (shouldClearSubDepartmentValue) this.edit_department_parent_sub = ''

            this.edit_department_parent_sub_options = editDepartmentParentIdSubOptions
        },

        openActionsPosition(id) {
            this.actions_position = true
            this.selected_position_id = id
        },

        getDepartmentById(id) {
            if (!id) return null
            for (const department of this.company_departments.all) {
                if (department.id == id) return department
            }
        },

        selectDepartment(department) {
            let selected_department
            let selected_sub_department
            let selected_sub_sub_department
            const selectedDepartmentPositions = []

            this.actions_department = true

            if (!department.isSubDepartment) {
                selected_department = { ...department, selected: true }
            } else if (!department.isSubSubDepartment) {
                selected_department = this.selected_department
                selected_sub_department = { ...department, selected: true }
            } else {
                selected_department = this.selected_department
                selected_sub_department = this.selected_sub_department
                selected_sub_sub_department = { ...department, selected: true }
            }

            if (selected_department && selected_department.positions.length) {
                const selectedBaseDepartmentPositions = {
                    department_name: selected_department.name,
                    positions: [],
                }

                for (const position of selected_department.positions) {
                    selectedBaseDepartmentPositions.positions.push(position)
                }

                selectedDepartmentPositions.push(selectedBaseDepartmentPositions)
            }

            if (selected_sub_department && selected_sub_department.positions.length) {
                const selectedSubDepartmentPositions = { department_name: selected_sub_department.name, positions: [] }

                for (const position of selected_sub_department.positions) {
                    selectedSubDepartmentPositions.positions.push(position)
                }

                selectedDepartmentPositions.push(selectedSubDepartmentPositions)
            }

            if (selected_sub_sub_department && selected_sub_sub_department.positions.length) {
                const selectedSubSubDepartmentPositions = { department_name: selected_sub_sub_department.name, positions: [] }

                for (const position of selected_sub_sub_department.positions) {
                    selectedSubSubDepartmentPositions.positions.push(position)
                }

                selectedDepartmentPositions.push(selectedSubSubDepartmentPositions)
            }

            this.selected_department = selected_department || {}
            this.selected_sub_department = selected_sub_department || {}
            this.selected_sub_sub_department = selected_sub_sub_department || {}

            this.selected_department_positions = selectedDepartmentPositions

            this.selected_position_id = ''
            this.actions_position = false
        },

        showCreateDepartments() {
            this.create_department = true
            this.view_positions = false
            this.editing_department = false
        },

        showViewPositions() {
            this.view_positions = true
            this.create_department = false
            this.editing_department = false
            this.get_company_departments().then(() => {
                this.component_loading = false
            })
        },

        clear() {
            this.department_name = ''
            this.department_class = ''
            this.report_to = ''
            this.department = ''
            this.position_name = ''
            this.submitted = false
            this.selected_position_id = ''
            this.selected_department = {}
            this.selected_subdepartment = {}
            this.selected_sub_subdepartment = {}
            this.actions_department = false
            this.actions_position = false
            this.job_description = ''

            this.modal_department = false
            this.modal_position = false
        },

        add_new_position: function () {
            this.submitted = true
            let errors = 0

            if (this.department == '' || this.department == null) {
                document.getElementById('department').focus()
                errors++
            }

            if (this.position_name == '' || this.position_name == null) {
                document.getElementById('position_name').focus()
                errors++
            }

            if (errors < 1) {
                let data = {
                    name: this.position_name,
                    department_id: this.department.value,
                    job_description: this.job_description,
                    head_of_department: this.position_head_of_department
                }

                this.$store.dispatch('company_data/positions/add_company_position', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('account_settings-alerts.positionsuccess'), 'Success', { timeut: 3000 })
                        this.get_company_departments().then(() => {
                            this.component_loading = false
                            this.view_positions = false
                        })
                        this.clear()
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        update_position: function () {
            this.submitted = true
            let errors = 0

            if (this.edit_department == '' || this.edit_department == null) {
                document.getElementById('edit_department').focus()
                errors++
            }
            if (this.edit_position_name == '' || this.edit_position_name == null) {
                document.getElementById('edit_position_name').focus()
                errors++
            }

            if (errors < 1) {
                let data = {
                    id: this.selected_position_id,
                    name: this.edit_position_name,
                    department_id: this.edit_department.value,
                    job_description: this.edit_job_description,
                    head_of_department: this.edit_position_head_of_department
                }

                this.$store.dispatch('company_data/positions/update_company_position', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('account_settings-alerts.positionupdated'), 'Success', { timeut: 3000 })
                        this.clear()
                        this.get_company_departments().then(() => {
                            this.component_loading = false
                        })
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        edit_position: function (id) {
            this.modal_position = true

            this.$store
                .dispatch('company_data/positions/show_company_position', id)
                .then((response) => {
                    this.edit_position_name = response.data.name
                    this.edit_job_description = response.data.job_description
                    this.edit_position_head_of_department = response.data.head_of_department === 1 ? true : false

                    this.$store.dispatch('company_data/departments/get_company_departments').then((res) => {
                        res.data.forEach((e) => {
                            this.edit_department_options.push({
                                name: e.name,
                                value: e.id,
                            })
                            if (response.data.department_id === e.id) {
                                this.edit_department = {
                                    name: e.name,
                                    value: e.id,
                                }
                            }
                        })
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        openEditDepartmentModal: function (department) {
            this.modal_department = true

            this.edit_department_name = department.name

            this.edit_department_class = {
                name: department.class,
                value: department.class,
            }

            this.edit_report_to = {
                name: department.report_to,
                value: department.report_to,
            }

            if (department.isSubSubDepartment) {
                const baseDepartment = this.getDepartmentById(department.parent.parent_id)
                this.edit_department_parent = {
                    name: baseDepartment.name,
                    value: baseDepartment.id,
                }
                this.edit_department_parent_sub = {
                    name: department.parent.name,
                    value: department.parent.id,
                }
            } else if (department.isSubDepartment) {
                this.edit_department_parent = {
                    name: department.parent.name,
                    value: department.parent.id,
                }
                this.edit_department_parent_sub = ''
            } else {
                this.edit_department_parent = ''
                this.edit_department_parent_sub = ''
            }

            this.edit_department_parent_options = this.company_departments.base
                .filter((_department) => _department.id != department.id)
                .map((_department) => ({
                    name: _department.name,
                    value: _department.id,
                }))

            this.onEditDepartmentParentIdSelect()
        },

        tryToDelete: function () {
            this.$toast.warning(this.$t('account_settings-alerts.trytodelete'), 'Warning', { timeut: 3000 })
        },

        delete_department: function (id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/departments/delete_department_company', id)
                                .then(() => {
                                    this.$toast.error(this.$t('account_settings-alerts.deletedepartment'), 'Success', { timeut: 3000 })
                                    this.get_company_departments().then(() => {
                                        this.component_loading = false
                                        this.selected_department = {}
                                        this.selected_sub_department = {}
                                        this.selected_sub_sub_department = {}
                                    })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },

        delete_position: function (id) {
            this.$toast.question(this.$t('alerts.are_you_sure'), this.$t('alerts.confirm'), {
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 'once',
                id: 'question',
                zindex: 999,
                title: 'Hey',
                position: 'center',
                buttons: [
                    [
                        '<button><b>YES</b></button>',
                        (instance, toast) => {
                            this.$store
                                .dispatch('company_data/positions/delete_company_position', id)
                                .then(() => {
                                    this.$toast.error(this.$t('account_settings-alerts.deleteposition'), 'Success', { timeut: 3000 })
                                    this.component_loading = true
                                    this.get_company_departments().then(() => {
                                        this.component_loading = false
                                        this.selected_department = {}
                                        this.selected_sub_department = {}
                                        this.selected_sub_sub_department = {}
                                    })
                                })
                                .catch((error) => {
                                    console.error(error)
                                })

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                        true,
                    ],
                    [
                        '<button>NO</button>',
                        function (instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                        },
                    ],
                ],
            })
        },

        update_department: function () {
            this.submitted = true
            let errors = 0

            let departmentToUpdate

            if (this.selected_sub_sub_department.selected) {
                departmentToUpdate = this.selected_sub_sub_department
            } else if (this.selected_sub_department.selected) {
                departmentToUpdate = this.selected_sub_department
            } else {
                departmentToUpdate = this.selected_department
            }

            if (this.edit_department_class == '' || this.edit_department_class == null) {
                document.getElementById('edit_department_class').focus()
                errors++
            }
            if (this.edit_department_name == '' || this.edit_department_name == null) {
                document.getElementById('edit_department_name').focus()
                errors++
            }

            if (errors < 1) {
                let parentId

                if (this.edit_department_parent_sub && this.edit_department_parent_sub.value) {
                    parentId = this.edit_department_parent_sub.value
                } else {
                    parentId = this.edit_department_parent.value
                }

                let data = {
                    id: departmentToUpdate.id,
                    name: this.edit_department_name,
                    parent_id: parentId,
                    class: this.edit_department_class.value,
                    report_to: this.edit_report_to.value,
                }

                this.$store.dispatch('company_data/departments/update_company_department', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('account_settings-alerts.departmentupdated'), 'Success', { timeut: 3000 })
                        this.clear()
                        this.get_company_departments().then(() => {
                            const updatedDepartment = this.getDepartmentById(departmentToUpdate.id)
                            if (updatedDepartment.isSubSubDepartment) {
                                this.selected_department = { ...this.getDepartmentById(updatedDepartment.parent.parent.id), selected: true }
                                this.selected_sub_department = { ...this.getDepartmentById(updatedDepartment.parent.id), selected: true }
                                this.selected_sub_sub_department = { ...this.getDepartmentById(updatedDepartment.id), selected: true }
                            } else if (updatedDepartment.isSubDepartment) {
                                this.selected_department = { ...this.getDepartmentById(updatedDepartment.parent.parent.id), selected: true }
                                this.selected_sub_department = { ...this.getDepartmentById(updatedDepartment.parent.id), selected: true }
                                this.selected_sub_sub_department = {}
                            } else {
                                this.selected_department = { ...this.getDepartmentById(updatedDepartment.id), selected: true }
                                this.selected_sub_department = {}
                                this.selected_sub_sub_department = {}
                            }

                            this.selectDepartment(updatedDepartment)

                            this.component_loading = false
                        })
                        this.modal_department = false
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        add_new_department: function () {
            this.submitted = true
            let errors = 0

            if (this.department_name == '' || this.department_name == null) {
                document.getElementById('department_name').focus()
                errors++
            }

            if (errors < 1) {
                let data = {
                    name: this.department_name,
                    parent_id: this.department_parent_id_sub && this.department_parent_id_sub.value ? this.department_parent_id_sub.value : this.department_parent_id.value,
                    class: this.department_class.value,
                    report_to: this.report_to.value,
                }

                this.$store.dispatch('company_data/departments/add_company_department', data).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('account_settings-alerts.departmentsuccess'), 'Success', { timeut: 3000 })
                        this.clear()
                        this.get_company_departments().then(() => {
                            this.onDepartmentParentIdSelect()
                            this.component_loading = false
                        })
                    } else {
                        this.$toast.error(this.$t('account_settings-alerts.somethingwentwrong'), 'Error', { timeut: 3000 })
                    }
                })
            } else {
                this.$toast.warning(this.$t('account_settings-alerts.fillrequiredfields'), 'Warning', { timeut: 3000 })
            }
        },

        get_company_departments: function () {
            this.component_loading = true
            this.department_options = []
            return this.$store.dispatch('company_data/departments/get_company_departments')
        },
    },

    created() {
        this.get_company_departments().then(() => {
            this.component_loading = false
        })
    },
}
</script>

<style lang="scss">
.vueeditor {
    padding-right: 30px;
    height: 200px;
}

.form-type-1 .form__group .multiselect .multiselect__tags {
    min-height: 50px !important;
    height: auto !important;
}
</style>
