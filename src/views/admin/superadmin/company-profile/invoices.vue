<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Invoices</h4>
            <ul class="header_menu_right">
                <li>
                    <a @click="openGenerateInvoiceModal" class="site_btn btn_blue"> Generate Invoice </a>
                </li>
            </ul>
        </div>
        <template v-if="component_loading" class="widget_listings">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="payment_settings_packages">
                <template v-if="get_company_invoices.total > 0">
                    <table class="current_company_packages">
                        <thead>
                            <tr>
                                <td>Invoice ID</td>
                                <td>Date</td>
                                <td>Due date</td>
                                <td>Total cost</td>
                                <td>Status</td>
                                <td>Payment method</td>
                                <td>Action</td>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="invoice_item in get_company_invoices.data">
                                <tr :key="invoice_item.invoice_id" class="table_body_row">
                                    <td>
                                        {{ invoice_item.invoice_id }}
                                    </td>
                                    <td>
                                        {{ invoice_item.invoice_date | moment('DD/MM/YYYY') }}
                                    </td>
                                    <td>
                                        {{ invoice_item.invoiced_due_date | moment('DD/MM/YYYY') }}
                                    </td>
                                    <td>
                                        {{ invoice_item.invoice_total }}€
                                        <template v-if="invoice_item.invoice_type == 'monthly'"> /monthly </template>
                                        <template v-else> /yearly </template>
                                    </td>

                                    <td>
                                        <template v-if="invoice_item.invoice_status == 'paid'">
                                            <span :class="'invoice-status-' + invoice_item.invoice_status"> Paid</span>
                                        </template>
                                        <template v-if="invoice_item.invoice_status == 'processing'">
                                            <span :class="'invoice-status-' + invoice_item.invoice_status"> Processing</span>
                                        </template>
                                        <template v-if="invoice_item.invoice_status == 'canceled'">
                                            <span :class="'invoice-status-' + invoice_item.invoice_status">Canceled</span>
                                        </template>
                                        <template v-if="invoice_item.invoice_status == 'not_paid'">
                                            <span :class="'invoice-status-' + invoice_item.invoice_status"> Not Paid</span>
                                        </template>
                                    </td>

                                    <td>
                                        <template v-if="invoice_item.payment_method == 'bank'"> Bank transfer </template>
                                        <template v-if="invoice_item.payment_method == null"> Bank transfer </template>
                                    </td>
                                    <td>
                                        <div class="listing_menu_action">
                                            <b-dropdown variant="link" size="lg" no-caret right>
                                                <template slot="button-content">
                                                    <div class="header_user_profile">
                                                        <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                                            <desc>Created with Sketch.</desc>
                                                            <defs></defs>
                                                            <g id="Page-1" stroke="none" stroke-width="1">
                                                                <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
                                                                    <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                        <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                            <g id="Single-post-">
                                                                                <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                    <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                    <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                    <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </template>

                                                <b-dropdown-item @click="openEditInvoiceModal(invoice_item)" class="table-action">
                                                    <svg width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 504.124 504.124" style="enable-background: new 0 0 504.124 504.124" xml:space="preserve">
                                                        <path style="fill: #efc75e" d="M0,126.622L252.062,1.378l252.062,125.243v16.542L252.062,268.406L0,143.558V126.622z" />
                                                        <path style="fill: #e7bf55" d="M0,126.622l252.062,125.243l252.062-125.243v250.88l-252.85,125.243L0,377.503V126.622z" />
                                                        <path style="fill: #dbb551" d="M252.062,502.352V251.866L1.575,127.409H0v250.092l251.274,125.243L252.062,502.352z" />
                                                        <path style="fill: #f7e3af" d="M102.794,75.815l251.668,125.243l51.2-25.206L153.206,50.61L102.794,75.815z" />
                                                        <path
                                                            style="fill: #f1d999"
                                                            d="M354.462,201.059l51.2-25.206v78.769l-13.785-2.363l-14.572,17.723l-22.843-1.575
                                                                                                    C354.462,268.406,354.462,201.059,354.462,201.059z"
                                                        />
                                                        <path
                                                            style="fill: #f2f2f2"
                                                            d="M200.074,351.902l-85.071-42.535c-4.726-2.363-8.665,0.394-8.665,6.302v57.108
                                                                                                    c0,5.908,3.938,12.603,8.665,14.966l85.465,42.535c4.726,2.363,8.665-0.394,8.665-6.302v-57.502
                                                                                                    C208.738,360.566,204.8,354.266,200.074,351.902z M180.775,398.77l-54.351-27.175c-2.363-1.182-4.332-4.726-4.332-7.877
                                                                                                    s1.969-4.726,4.332-3.545l54.351,27.175c2.363,1.182,4.332,4.726,4.332,7.877S183.138,399.951,180.775,398.77z M188.652,379.077
                                                                                                    l-62.228-31.508c-2.363-1.182-4.332-4.726-4.332-7.877s1.969-4.726,4.332-3.545l62.228,31.508c2.363,1.182,4.332,4.726,4.332,7.877
                                                                                                    C192.985,379.077,191.015,380.258,188.652,379.077z"
                                                        />
                                                    </svg>
                                                    <p>Edit invoice</p>
                                                </b-dropdown-item>

                                                <b-dropdown-item @click="deleteInvoice(invoice_item)" class="table-action">
                                                    <svg width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background: new 0 0 511.999 511.999" xml:space="preserve">
                                                        <circle style="fill: #e21b1b" cx="255.999" cy="255.999" r="255.999" />

                                                        <rect x="244.002" y="120.008" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0397 256.0022)" style="fill: #ffffff" width="24" height="271.988" />

                                                        <rect x="120.008" y="244.007" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0428 256.0035)" style="fill: #ffffff" width="271.988" height="24" />
                                                    </svg>
                                                    <p>Delete invoice</p>
                                                </b-dropdown-item>
                                                <b-dropdown-item :to="'/app/company/profile/' + current_company_id + '/invoice?c_id=' + current_company_id + '&i_id=' + invoice_item.invoice_id" class="table-action">
                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" viewBox="0 0 405.558 405.558" style="enable-background: new 0 0 405.558 405.558" xml:space="preserve">
                                                        <path
                                                            style="fill: none"
                                                            d="M202.778,176.515c-14.481,0-26.263,11.781-26.263,26.264c0,14.482,11.781,26.264,26.263,26.264
                                                                                                            c14.482,0,26.265-11.781,26.265-26.264C229.043,188.296,217.261,176.515,202.778,176.515z"
                                                        />
                                                        <path
                                                            style="fill: none"
                                                            d="M117.752,119.257c-16.043,4.727-30.87,10.826-43.997,18.201C41.67,155.482,24,178.679,24,202.779
                                                                                                            c0,24.098,17.67,47.295,49.755,65.318c13.127,7.375,27.953,13.475,43.995,18.201c-21.151-21.531-34.222-51.025-34.222-83.52
                                                                                                            C83.528,170.283,96.599,140.789,117.752,119.257z"
                                                        />
                                                        <path
                                                            style="fill: none"
                                                            d="M331.803,137.458c-13.127-7.375-27.954-13.475-43.997-18.201
                                                                                                            c21.152,21.531,34.223,51.025,34.223,83.521c0,32.494-13.069,61.988-34.221,83.52c16.043-4.727,30.869-10.826,43.995-18.201
                                                                                                            c32.085-18.023,49.755-41.221,49.755-65.318C381.558,178.679,363.888,155.482,331.803,137.458z"
                                                        />
                                                        <path
                                                            style="fill: #3d6889"
                                                            d="M343.558,116.533c-36.61-20.566-84.664-32.184-135.791-32.893
                                                                                                            c-1.654-0.068-3.315-0.111-4.986-0.111c-1.67,0-3.329,0.043-4.982,0.111c-51.129,0.709-99.186,12.326-135.797,32.893
                                                                                                            C22.018,138.994,0,169.623,0,202.779c0,33.154,22.018,63.783,62.001,86.244c36.599,20.561,84.633,32.176,135.741,32.893
                                                                                                            c1.672,0.068,3.35,0.113,5.038,0.113c1.689,0,3.369-0.045,5.042-0.115c51.107-0.717,99.138-12.332,135.735-32.891
                                                                                                            c39.982-22.461,62-53.09,62-86.244C405.558,169.623,383.539,138.994,343.558,116.533z M73.755,268.097
                                                                                                            C41.67,250.074,24,226.876,24,202.779c0-24.1,17.67-47.297,49.755-65.32c13.127-7.375,27.954-13.475,43.997-18.201
                                                                                                            c-21.153,21.531-34.224,51.025-34.224,83.521c0,32.494,13.07,61.988,34.222,83.52C101.708,281.572,86.882,275.472,73.755,268.097z
                                                                                                            M207.263,297.919c-1.492,0.02-2.986,0.031-4.484,0.031c-1.496,0-2.989-0.012-4.479-0.031
                                                                                                            c-50.45-2.348-90.771-44.123-90.771-95.141c0-51.029,40.338-92.811,90.802-95.143c1.48-0.02,2.962-0.031,4.448-0.031
                                                                                                            c1.487,0,2.972,0.012,4.453,0.031c50.461,2.332,90.797,44.113,90.797,95.143C298.028,253.796,257.709,295.572,207.263,297.919z
                                                                                                            M331.803,268.097c-13.126,7.375-27.952,13.475-43.995,18.201c21.151-21.531,34.221-51.025,34.221-83.52
                                                                                                            c0-32.496-13.07-61.99-34.223-83.521c16.043,4.727,30.87,10.826,43.997,18.201c32.085,18.023,49.755,41.221,49.755,65.32
                                                                                                            C381.558,226.876,363.888,250.074,331.803,268.097z"
                                                        />
                                                        <path
                                                            style="fill: #73d0f4"
                                                            d="M207.231,107.636c-1.481-0.02-2.966-0.031-4.453-0.031c-1.486,0-2.969,0.012-4.448,0.031
                                                                                                            c-50.464,2.332-90.802,44.113-90.802,95.143c0,51.018,40.32,92.793,90.771,95.141c1.49,0.02,2.983,0.031,4.479,0.031
                                                                                                            c1.498,0,2.992-0.012,4.484-0.031c50.446-2.348,90.766-44.123,90.766-95.141C298.028,151.749,257.692,109.968,207.231,107.636z
                                                                                                            M202.778,253.042c-27.715,0-50.263-22.549-50.263-50.264s22.548-50.264,50.263-50.264c27.716,0,50.265,22.549,50.265,50.264
                                                                                                            S230.494,253.042,202.778,253.042z"
                                                        />
                                                        <path
                                                            style="fill: #3d6889"
                                                            d="M202.778,152.515c-27.715,0-50.263,22.549-50.263,50.264s22.548,50.264,50.263,50.264
                                                                                                            c27.716,0,50.265-22.549,50.265-50.264S230.494,152.515,202.778,152.515z M202.778,229.042c-14.481,0-26.263-11.781-26.263-26.264
                                                                                                            c0-14.482,11.781-26.264,26.263-26.264c14.482,0,26.265,11.781,26.265,26.264C229.043,217.261,217.261,229.042,202.778,229.042z"
                                                        />
                                                    </svg>
                                                    <p>View invoice</p>
                                                </b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </template>
                <template v-else> This company does not have any invoices </template>
            </div>

            <b-modal ref="generate_invoice_modal" hide-footer title="Ndrysho çmimin e modulit">
                <form class="form-type-1" @submit.prevent="generateInvoice">
                    <p class="m-b-50">Çmimi i modulit ndryshohet vetem per këtë kompani. Ndersa kompanit tjera e kan çmimin gjeneral te caktum ne faqen e moduleve.</p>

                    <div class="form__group">
                        <label for="invoice_type" class="form__label bold">Zgjedh llojin e fatures <span class="required">(*)</span></label>

                        <b-form-select name="invoice_type" id="invoice_type" v-validate="'required'" v-model="generate_invoice_data_fields.invoice_type" class="mb-3">
                            <option value="monthly">Fature Mujore</option>
                            <option value="yearly">Fature Vjetore</option>
                        </b-form-select>
                        <span v-if="submitted && errors.has('invoice_type')" class="form-error-notification error"> Kjo fushe është e domosdoshme </span>
                    </div>
                    <div class="form__group">
                        <label for="invoice_date" class="form__label bold">Invoice date <span class="required">(*)</span></label>
                        <datepicker v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="invoice_date" placeholder="20/05/2019" v-model="generate_invoice_data_fields.invoice_date" name="invoice_date"></datepicker>
                        <span v-if="submitted && errors.has('invoice_date')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>
                    <div class="form__group">
                        <label for="invoiced_due_date" class="form__label bold">Invoice due date <span class="required">(*)</span></label>
                        <datepicker v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="invoiced_due_date" placeholder="20/05/2019" v-model="generate_invoice_data_fields.invoiced_due_date" name="invoiced_due_date"></datepicker>
                        <span v-if="submitted && errors.has('invoiced_due_date')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="form__group">
                        <label for="invoice_month" class="form__label bold">Pagesa per muajin <span class="required">(*)</span></label>

                        <b-form-select name="invoice_month" id="invoice_month" v-model="generate_invoice_data_fields.invoice_month" class="mb-3" required>
                            <option value="1">Janar</option>
                            <option value="2">Shkurt</option>
                            <option value="3">Mars</option>
                            <option value="4">Prill</option>
                            <option value="5">Maj</option>
                            <option value="6">Qershor</option>
                            <option value="7">Korrik</option>
                            <option value="8">Gusht</option>
                            <option value="9">Shtator</option>
                            <option value="10">Tetor</option>
                            <option value="11">Nentor</option>
                            <option value="12">Dhjetor</option>
                        </b-form-select>
                    </div>
                    <div class="form__group">
                        <label for="invoice_year" class="form__label bold">Pagesa per vitin: <span class="required">(*)</span></label>

                        <b-form-select name="invoice_year" id="invoice_year" v-model="generate_invoice_data_fields.invoice_year" class="mb-3" required>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </b-form-select>
                    </div>
                    <div class="form__group">
                        <label for="invoice_notes" class="form__label bold">Invoice notes: </label>
                        <textarea class="form__textarea" id="invoice_notes" type="text" placeholder="Please add some notes about invoice here." v-model="generate_invoice_data_fields.invoice_notes" name="invoice_notes"></textarea>
                    </div>

                    <div class="modal_footer_buttons">
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
                                <button class="outlined_link outline_green" type="submit">Generate invoice</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </b-modal>

            <b-modal ref="edit_invoice_modal" hide-footer title="Ndrysho detajet e fatures">
                <form class="form-type-1" @submit.prevent="updateInvoice">
                    <p class="m-b-50">
                        Mundesit e ndryshimit te detajeve te fatures jane te limituara. Ti nuk mundesh me ndryshu çdo detaj ne fature sepse gjenerohen ne menyre automatike.
                        <br /><br />
                        Me posht mundesh mi pa vetem detajet qe munden mu ndryshu. Perndryshe nqofse ke ndonje gabim ne fature, mundesh me fshi dhe me gjeneru perseri.
                    </p>

                    <div class="form__group">
                        <label for="invoiced_due_date" class="form__label bold">Invoice due date <span class="required">(*)</span></label>
                        <datepicker format="dd-MM-yyyy" class="form__input" id="invoiced_due_date" placeholder="20/05/2019" v-model="invoice_to_be_modified.invoiced_due_date" name="invoiced_due_date" required></datepicker>
                    </div>
                    <div class="form__group">
                        <label for="invoice_payment_date" class="form__label bold">Invoice payment date <span class="required">(*)</span></label>
                        <datepicker format="dd-MM-yyyy" class="form__input" id="invoice_payment_date" placeholder="20/05/2019" v-model="invoice_to_be_modified.invoice_payment_date" name="invoice_payment_date" required></datepicker>
                    </div>

                    <div class="form__group">
                        <label for="invoice_month" class="form__label bold">Statusi i pageses <span class="required">(*)</span></label>

                        <b-form-select name="invoice_month" id="invoice_month" v-model="invoice_to_be_modified.invoice_status" class="mb-3" required>
                            <option value="processing">Procesim</option>
                            <option value="paid">E paguar</option>
                            <option value="canceled">E anuluar</option>
                            <option value="not_paid">E pa paguar</option>
                        </b-form-select>
                    </div>
                    <!--
                                        <div class="form__group">
                                                    <label  for="payment_method" 
                                                            class="form__label bold">Metoda e pageses <span class="required">(*)</span></label>
                                                   

                                                    <b-form-select disabled name="payment_method" id="payment_method"  v-model="invoice_to_be_modified.payment_method" class="mb-3" required>
                                                        <option value="bank" >Bank</option>
                                                    </b-form-select>
                                                 
                                                   
                                        </div>
                                        -->

                    <div class="form__group">
                        <label for="invoice_notes" class="form__label bold">Invoice notes: </label>
                        <textarea class="form__textarea" id="invoice_notes" type="text" placeholder="Please add some notes about invoice here." v-model="invoice_to_be_modified.invoice_notes" name="invoice_notes"></textarea>
                    </div>

                    <div class="modal_footer_buttons">
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
                                <button class="outlined_link outline_green" type="submit">
                                    {{ $t('button.update') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </b-modal> </template
        ><!-- end of template -->
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    components: {},
    computed: {
        get_company_invoices: function () {
            return this.$store.getters['superadmin/payments/get_company_invoices']
        },
    },
    watch: {
        get_company_invoices(new_value) {
            return new_value
        },
    },
    data() {
        return {
            component_loading: true,
            current_company_id: '',
            submitted: false,
            spinner_updating: false,

            generate_invoice_data_fields: {
                invoice_type: 'monthly',
                invoice_date: '',
                invoiced_due_date: '',
                invoice_month: '',
                invoice_year: '',
                invoice_notes: '',
            },

            invoice_to_be_modified: [],
        }
    },
    methods: {
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('superadmin/payments/get_all_company_invoices_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        deleteInvoice(invoice_data) {
            let data = {
                invoice_id: invoice_data.invoice_id,
                company_id: invoice_data.company_id,
            }
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('superadmin/payments/delete_company_invoice', data).then((response) => {
                    this.component_loading = false
                    this.alert_handle_in_calls_directly('company_module_invoice_deleted_sucessfully', 'success')
                })
            }, 400)
        },
        openGenerateInvoiceModal() {
            this.$refs.generate_invoice_modal.show()
        },
        openEditInvoiceModal(invoice_data) {
            this.$refs.edit_invoice_modal.show()
            this.invoice_to_be_modified = invoice_data
        },
        closeModal() {
            this.$refs.generate_invoice_modal.hide()
            this.$refs.edit_invoice_modal.hide()
        },
        generateInvoice() {
            this.spinner_updating = true
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let invoice_date = this.$moment(this.generate_invoice_data_fields.invoice_date).format('YYYY-MM-DD')
                    let invoice_due_date = this.$moment(this.generate_invoice_data_fields.invoiced_due_date).format('YYYY-MM-DD')
                    let data = {
                        company_id: this.current_company_id,
                        invoice_type: this.generate_invoice_data_fields.invoice_type,
                        invoice_date: invoice_date,
                        invoiced_due_date: invoice_due_date,
                        invoice_month: this.generate_invoice_data_fields.invoice_month,
                        invoice_year: this.generate_invoice_data_fields.invoice_year,
                        invoice_notes: this.generate_invoice_data_fields.invoice_notes,
                    }

                    setTimeout(() => {
                        this.$store.dispatch('superadmin/payments/generate_company_invoice', data).then((response) => {
                            this.submitted = false
                            this.spinner_updating = false
                            if (response.status == 404) {
                                this.alert_handle_in_calls_directly('invoice_already_generated', 'error')
                            } else {
                                this.alert_handle_in_calls_directly('module_price_has_been_updated', 'success')
                            }

                            this.closeModal()
                            this.generate_invoice_data_fields = []
                        })
                    }, 400)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        updateInvoice() {
            this.spinner_updating = true
            this.submitted = true

            let errors = 0

            if (this.invoice_to_be_modified.invoiced_due_date == '' || this.invoice_to_be_modified.invoiced_due_date == null) {
                alert('Please fill the DUE Date field')
                errors++
                return
            }
            if (this.invoice_to_be_modified.invoice_payment_date == '' || this.invoice_to_be_modified.invoice_payment_date == null) {
                alert('Please fill the Invoice Payment Date field')
                errors++
                return
            }
            if (this.invoice_to_be_modified.invoice_status == '' || this.invoice_to_be_modified.invoice_status == null) {
                alert('Please fill the Status field')
                errors++
                return
            }

            if (errors < 1) {
                let invoice_due_date = this.$moment(this.invoice_to_be_modified.invoiced_due_date).format('YYYY-MM-DD')
                let invoice_payment_date = this.$moment(this.invoice_to_be_modified.invoice_payment_date).format('YYYY-MM-DD')
                let data = {
                    company_id: this.current_company_id,
                    invoice_id: this.invoice_to_be_modified.invoice_id,
                    invoice_status: this.invoice_to_be_modified.invoice_status,
                    invoiced_due_date: invoice_due_date,
                    invoice_payment_date: invoice_payment_date,
                    payment_method: 'bank',
                    invoice_notes: this.invoice_to_be_modified.invoice_notes,
                }

                setTimeout(() => {
                    this.$store.dispatch('superadmin/payments/edit_invoice_details', data).then((response) => {
                        this.submitted = false
                        this.spinner_updating = false
                        if (response.status == 404) {
                            this.alert_handle_in_calls_directly('invoice_already_generated', 'error')
                        } else {
                            this.alert_handle_in_calls_directly('module_price_has_been_updated', 'success')
                        }

                        this.closeModal()
                        this.invoice_to_be_modified = []
                    })
                }, 400)
            } else {
                this.spinner_updating = false
            }
        },
    },
    created() {
        //alert('Momentalisht jem tu punu ne Edit Invoice, View dhe Delete jan te kryme')
        let current_company_id = ''

        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_company_id = parseInt(this.$route.params.id)
            this.current_company_id = current_company_id
            setTimeout(() => {
                this.$store.dispatch('superadmin/payments/get_all_company_invoices', this.current_company_id).then((response) => {
                    this.component_loading = false
                })
            }, 400)
        }
    },

    components: {
        Datepicker,
    },
}
</script>

<style lang="scss" scoped>
.payment_settings_packages {
    background: #fff;
    padding: 30px;
}

table.current_company_packages {
    .invoice_item {
        .sidebar_icon {
            width: 65px;
            height: 65px;
            font-size: 32px;
            line-height: 73px;
        }
    }
    .package_description {
        margin-left: 15px;
        display: inline-block;
        vertical-align: middle;
        h5 {
            margin: 0;
        }
        p {
            margin: 0;
        }
    }
    .package_price {
        p {
            font-size: 20px;
            font-family: 'Poppins', 'sans-serif';
            font-weight: 500;
            color: #21a9e6;

            span {
                font-size: 12px;
                color: #6b6b6b;
            }
        }
    }
    width: 100%;
    td {
        padding-left: 18px;
        padding-bottom: 0;
        padding-top: 13px;
    }

    thead {
        tr {
            height: 50px;
            border-bottom: 1px solid #f1f1f1;

            font-size: 13px;
            text-transform: uppercase;
            color: #3a384e;
            font-weight: 500;

            td {
                text-align: right;
                &:first-child {
                    text-align: left !important;
                }
            }
        }
    }
    tbody {
        tr {
            border-bottom: 1px solid #f1f1f1;
            vertical-align: middle;
            line-height: 79px;
            h6 {
                display: inline-block;
            }

            td {
                text-align: right;
                &:first-child {
                    text-align: left !important;
                }
            }
        }
    }
}

.invoice-status-paid {
    color: #4dd365;
}
.invoice-status-processing {
    color: #fdc72e;
}
.invoice-status-canceled {
    color: #fc3934;
}
.invoice-status-not_paid {
    color: #fc3934;
}

.invoice_details {
    padding: 20px;
    ul {
        text-align: left !important;
        li {
            min-width: 106px;
        }
    }
    .listing_menu_action {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
.invoice_packages_popover {
    .invoice_item {
        h6 {
            display: inline-block;
            text-transform: capitalize;
            font-weight: initial;
            font-size: 14px;
        }
        p {
            margin: 0;
            padding: 0;
            display: inline-block;
            font-size: 13px;
            float: right;
        }
    }
}

.listing_menu_action {
    top: -10px !important;
    position: relative;
    .dropdown-menu .dropdown-item {
        line-height: 2;
        padding: 10px;
    }
    .header_user_profile {
        svg {
            fill: #c1c1c1;
        }
    }
    p {
        display: inline-block;
        margin: 0;
        font-weight: 500 !important;
    }
}
</style>
