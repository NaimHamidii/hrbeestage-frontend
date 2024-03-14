<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template>
            <div class="boxi m-t-20">
                <div class="textinBox">
                    <div class="text-center">
                        <h4>{{ $t('emp_pages.departments') }}</h4>
                    </div>
                </div>
                <template v-if="departments_class_a.length != 0">
                    <div class="departments-flex text-center">
                        <div :class="select_dep_id === dep_a.id ? 'departments-item-active' : 'departments-item'" v-for="dep_a in departments_class_a" :key="dep_a.id" @click="openActions(dep_a.id)">
                            {{ dep_a.name }}
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="departments_class_b.length != 0">
                    <div class="departments-flex text-center">
                        <div :class="select_dep_id === dep_b.id ? 'departments-item-active' : 'departments-item'" v-for="dep_b in departments_class_b" :key="dep_b.id" @click="openActions(dep_b.id)">
                            {{ dep_b.name }}
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="departments_class_c.length != 0">
                    <div class="departments-flex text-center">
                        <div :class="select_dep_id === dep_c.id ? 'departments-item-active' : 'departments-item'" v-for="dep_c in departments_class_c" :key="dep_c.id" @click="openActions(dep_c.id)">
                            {{ dep_c.name }}
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="departments_class_d.length != 0">
                    <div class="departments-flex text-center">
                        <div :class="select_dep_id === dep_d.id ? 'departments-item-active' : 'departments-item'" v-for="dep_d in departments_class_d" :key="dep_d.id" @click="openActions(dep_d.id)">
                            {{ dep_d.name }}
                        </div>
                    </div>
                    <hr />
                </template>
                <template v-if="departments_class_e.length != 0">
                    <div class="departments-flex text-center">
                        <div :class="select_dep_id === dep_e.id ? 'departments-item-active' : 'departments-item'" v-for="dep_e in departments_class_e" :key="dep_e.id" @click="openActions(dep_e.id)">
                            {{ dep_e.name }}
                        </div>
                    </div>
                    <hr />
                </template>
            </div>

            <div v-if="select_dep_id" class="boxi m-t-20">
                <template v-if="positions_by_departments.length != 0">
                    <div class="textinBox">
                        <div class="text-center">
                            <h4>{{ $t('emp_pages.positions') }}</h4>
                        </div>
                    </div>
                    <div class="departments-flex text-center">
                        <div class="departments-item" v-for="position_item in positions_by_departments" :key="position_item.id">
                            {{ position_item.name }}
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="textinBox text-center">
                        <h4>{{ $t('account_settings.noposition') }}</h4>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    computed: {
        departments_class_a: function () {
            return this.$store.getters['employee_data/companysettings/get_departments_class_a']
        },
        departments_class_b: function () {
            return this.$store.getters['employee_data/companysettings/get_departments_class_b']
        },
        departments_class_c: function () {
            return this.$store.getters['employee_data/companysettings/get_departments_class_c']
        },
        departments_class_d: function () {
            return this.$store.getters['employee_data/companysettings/get_departments_class_d']
        },
        departments_class_e: function () {
            return this.$store.getters['employee_data/companysettings/get_departments_class_e']
        },

        positions_by_departments: function () {
            return this.$store.getters['employee_data/companysettings/get_positions_by_departments']
        },
    },

    watch: {
        departments_class_a: function (new_value) {
            return new_value
        },
        departments_class_b: function (new_value) {
            return new_value
        },
        departments_class_c: function (new_value) {
            return new_value
        },
        departments_class_d: function (new_value) {
            return new_value
        },
        departments_class_e: function (new_value) {
            return new_value
        },

        positions_by_departments: function (new_value) {
            return new_value
        },
    },

    data() {
        return {
            component_loading: false,
            select_dep_id: '',
        }
    },
    methods: {
        openActions(id) {
            this.select_dep_id = id

            let data = {
                department_id: this.select_dep_id,
            }

            setTimeout(() => {
                this.$store.dispatch('employee_data/companysettings/get_positions_by_department', data).then((response) => {})
            })
        },
        get_company_departments_with_classes: function () {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('employee_data/companysettings/get_company_departments_with_class_a')
                this.$store.dispatch('employee_data/companysettings/get_company_departments_with_class_b')
                this.$store.dispatch('employee_data/companysettings/get_company_departments_with_class_c')
                this.$store.dispatch('employee_data/companysettings/get_company_departments_with_class_d')
                this.$store.dispatch('employee_data/companysettings/get_company_departments_with_class_e')
            }, 200)
            this.component_loading = false
        },
    },
    created() {
        this.get_company_departments_with_classes()
    },
}
</script>
