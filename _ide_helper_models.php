<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\AcceptEstimate
 *
 * @property int $id
 * @property int $estimate_id
 * @property string $full_name
 * @property string $email
 * @property string $signature
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate query()
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereEstimateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereUpdatedAt($value)
 */
	class AcceptEstimate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Attendance
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $clock_in_time
 * @property \Illuminate\Support\Carbon|null $clock_out_time
 * @property string $clock_in_ip
 * @property string $clock_out_ip
 * @property string $working_from
 * @property string $late
 * @property string $half_day
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $clock_in_date
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance query()
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockInIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockInTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockOutIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockOutTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereHalfDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereLate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereWorkingFrom($value)
 */
	class Attendance extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AttendanceSetting
 *
 * @property int $id
 * @property string $office_start_time
 * @property string $office_end_time
 * @property string|null $halfday_mark_time
 * @property int $late_mark_duration
 * @property int $clockin_in_day
 * @property string $employee_clock_in_out
 * @property string $office_open_days
 * @property string|null $ip_address
 * @property int|null $radius
 * @property string $radius_check
 * @property string $ip_check
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereClockinInDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereEmployeeClockInOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereHalfdayMarkTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereIpCheck($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereLateMarkDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereOfficeEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereOfficeOpenDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereOfficeStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereRadius($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereRadiusCheck($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereUpdatedAt($value)
 */
	class AttendanceSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\BaseModel
 *
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel query()
 */
	class BaseModel extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ClientCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereUpdatedAt($value)
 */
	class ClientCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ClientContact
 *
 * @property int $id
 * @property int $user_id
 * @property string $contact_name
 * @property string|null $phone
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $client
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact whereContactName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientContact whereUserId($value)
 */
	class ClientContact extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ClientDetails
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $company_name
 * @property string|null $address
 * @property string|null $shipping_address
 * @property string|null $postal_code
 * @property string|null $state
 * @property string|null $city
 * @property string|null $office
 * @property string|null $website
 * @property string|null $note
 * @property string|null $linkedin
 * @property string|null $facebook
 * @property string|null $twitter
 * @property string|null $skype
 * @property string|null $gst_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $category_id
 * @property int|null $sub_category_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereFacebook($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereGstNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereLinkedin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereSkype($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereSubCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereTwitter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientDetails whereWebsite($value)
 */
	class ClientDetails extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ClientNote
 *
 * @property int $id
 * @property int|null $client_id
 * @property string $title
 * @property int $type
 * @property int|null $member_id
 * @property int $is_client_show
 * @property int $ask_password
 * @property string $details
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereAskPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereIsClientShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereUpdatedAt($value)
 */
	class ClientNote extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ClientPayment
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $invoice_id
 * @property float $amount
 * @property string|null $gateway
 * @property string|null $transaction_id
 * @property int|null $currency_id
 * @property string|null $plan_id
 * @property string|null $customer_id
 * @property string|null $event_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $paid_on
 * @property string|null $remarks
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $offline_method_id
 * @property string|null $bill
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Invoice|null $invoice
 */
}

namespace App\Models{
/**
 * App\Models\ClientSubCategory
 *
 * @property int $id
 * @property int $category_id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ClientCategory $clientCategory
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientSubCategory whereUpdatedAt($value)
 */
	class ClientSubCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ClientUserNote
 *
 * @property int $id
 * @property int $user_id
 * @property int $client_note_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereClientNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientUserNote whereUserId($value)
 */
	class ClientUserNote extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Contract
 *
 * @property int $id
 * @property int $client_id
 * @property string $subject
 * @property string $amount
 * @property string $original_amount
 * @property int|null $contract_type_id
 * @property \Illuminate\Support\Carbon $start_date
 * @property string $original_start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property string|null $original_end_date
 * @property string|null $description
 * @property string|null $contract_name
 * @property string|null $company_logo
 * @property string|null $alternate_address
 * @property string|null $cell
 * @property string|null $office
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $postal_code
 * @property string|null $contract_detail
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User $client
 * @property-read \App\Models\ContractType|null $contractType
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ContractDiscussion[] $discussion
 * @property-read int|null $discussion_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ContractFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $icon
 * @property-read mixed $image_url
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ContractRenew[] $renewHistory
 * @property-read int|null $renew_history_count
 * @property-read \App\Models\ContractSign|null $signature
 * @method static \Database\Factories\ContractFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAlternateAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCompanyLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereContractDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereContractName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereContractTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOriginalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOriginalEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOriginalStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereUpdatedAt($value)
 */
	class Contract extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ContractDiscussion
 *
 * @property int $id
 * @property int $contract_id
 * @property int $from
 * @property string $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractDiscussion whereUpdatedAt($value)
 */
	class ContractDiscussion extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ContractFile
 *
 * @property int $id
 * @property int $user_id
 * @property int $contract_id
 * @property string $filename
 * @property string $hashname
 * @property string $size
 * @property string $google_url
 * @property string $dropbox_link
 * @property string $external_link_name
 * @property string $external_link
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Contract $contract
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereExternalLinkName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractFile whereUserId($value)
 */
	class ContractFile extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ContractRenew
 *
 * @property int $id
 * @property int $renewed_by
 * @property int $contract_id
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property string $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Contract $contract
 * @property-read mixed $icon
 * @property-read \App\Models\User $renewedBy
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereRenewedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereUpdatedAt($value)
 */
	class ContractRenew extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ContractSign
 *
 * @property int $id
 * @property int $contract_id
 * @property string $full_name
 * @property string $email
 * @property string $signature
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Contract $contract
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractSign whereUpdatedAt($value)
 */
	class ContractSign extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ContractType
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractType whereUpdatedAt($value)
 */
	class ContractType extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Country
 *
 * @property int $id
 * @property string $iso
 * @property string $name
 * @property string $nicename
 * @property string|null $iso3
 * @property int|null $numcode
 * @property int $phonecode
 * @method static \Illuminate\Database\Eloquent\Builder|Country newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Country newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Country query()
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereIso($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereIso3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereNicename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereNumcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country wherePhonecode($value)
 */
	class Country extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CreditNoteItem
 *
 * @property int $id
 * @property int $credit_note_id
 * @property string $item_name
 * @property string $type
 * @property int $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereCreditNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNoteItem whereUpdatedAt($value)
 */
	class CreditNoteItem extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CreditNotes
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $client_id
 * @property string $cn_number
 * @property int|null $invoice_id
 * @property \Illuminate\Support\Carbon $issue_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property float $discount
 * @property string $discount_type
 * @property float $sub_total
 * @property float $total
 * @property int|null $currency_id
 * @property string $status
 * @property string $recurring
 * @property string|null $billing_frequency
 * @property int|null $billing_interval
 * @property int|null $billing_cycle
 * @property string|null $file
 * @property string|null $file_original_name
 * @property string|null $note
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read mixed $issue_on
 * @property-read mixed $original_cn_number
 * @property-read mixed $total_amount
 * @property-read \App\Models\Invoice|null $invoice
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Invoice[] $invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CreditNoteItem[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payment
 * @property-read int|null $payment_count
 * @property-read \App\Models\Project|null $project
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes query()
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereBillingFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereBillingInterval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCnNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CreditNotes whereUpdatedAt($value)
 */
	class CreditNotes extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Currency
 *
 * @property int $id
 * @property string $currency_name
 * @property string|null $currency_symbol
 * @property string $currency_code
 * @property float|null $exchange_rate
 * @property string $is_cryptocurrency
 * @property float|null $usd_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Currency newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency query()
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCurrencyCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCurrencyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereCurrencySymbol($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereExchangeRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereIsCryptocurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Currency whereUsdPrice($value)
 */
	class Currency extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CurrencyFormatSetting
 *
 * @property int $id
 * @property string $currency_position
 * @property int $no_of_decimal
 * @property string|null $thousand_separator
 * @property string|null $decimal_separator
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting whereCurrencyPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting whereDecimalSeparator($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting whereNoOfDecimal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CurrencyFormatSetting whereThousandSeparator($value)
 */
	class CurrencyFormatSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CustomField
 *
 * @property int $id
 * @property int|null $custom_field_group_id
 * @property string $label
 * @property string $name
 * @property string $type
 * @property string $required
 * @property string|null $values
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereCustomFieldGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomField whereValues($value)
 */
	class CustomField extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CustomFieldGroup
 *
 * @property int $id
 * @property string $name
 * @property string|null $model
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup whereName($value)
 */
	class CustomFieldGroup extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CustomModulePermission
 *
 * @method static \Illuminate\Database\Eloquent\Builder|CustomModulePermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomModulePermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomModulePermission query()
 */
	class CustomModulePermission extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DashboardWidget
 *
 * @property int $id
 * @property string $widget_name
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $dashboard_type
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget query()
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereDashboardType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DashboardWidget whereWidgetName($value)
 */
	class DashboardWidget extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Designation
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeDetails[] $members
 * @property-read int|null $members_count
 * @method static \Illuminate\Database\Eloquent\Builder|Designation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Designation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Designation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Designation whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Designation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Designation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Designation whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Designation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Designation whereUpdatedAt($value)
 */
	class Designation extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Discussion
 *
 * @property int $id
 * @property int $discussion_category_id
 * @property int|null $project_id
 * @property string $title
 * @property string|null $color
 * @property int $user_id
 * @property int $pinned
 * @property int $closed
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon $last_reply_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $best_answer_id
 * @property int|null $last_reply_by_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\DiscussionCategory $category
 * @property-read \App\Models\User|null $lastReplyBy
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DiscussionReply[] $replies
 * @property-read int|null $replies_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion query()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereBestAnswerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereClosed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereDiscussionCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereLastReplyAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereLastReplyById($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion wherePinned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereUserId($value)
 */
	class Discussion extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DiscussionCategory
 *
 * @property int $id
 * @property int $order
 * @property string $name
 * @property string $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionCategory whereUpdatedAt($value)
 */
	class DiscussionCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DiscussionReply
 *
 * @property int $id
 * @property int $discussion_id
 * @property int $user_id
 * @property string $body
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Discussion $discussion
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply newQuery()
 * @method static \Illuminate\Database\Query\Builder|DiscussionReply onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply query()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereDiscussionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|DiscussionReply withTrashed()
 * @method static \Illuminate\Database\Query\Builder|DiscussionReply withoutTrashed()
 */
	class DiscussionReply extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EmailNotificationSetting
 *
 * @property int $id
 * @property string $setting_name
 * @property string $send_email
 * @property string $send_slack
 * @property string $send_push
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $slug
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereSendEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereSendPush($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereSendSlack($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereSettingName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmailNotificationSetting whereUpdatedAt($value)
 */
	class EmailNotificationSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EmployeeDetails
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $employee_id
 * @property string|null $address
 * @property float|null $hourly_rate
 * @property string|null $slack_username
 * @property int|null $department_id
 * @property int|null $designation_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon $joining_date
 * @property \Illuminate\Support\Carbon|null $last_date
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Team|null $department
 * @property-read \App\Models\Designation|null $designation
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereDepartmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereDesignationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereJoiningDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereLastDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereSlackUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDetails whereUserId($value)
 */
	class EmployeeDetails extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $filename
 * @property string $hashname
 * @property string|null $size
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $doc_url
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeDocument whereUserId($value)
 */
	class EmployeeDocument extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EmployeeLeaveQuota
 *
 * @property int $id
 * @property int $user_id
 * @property int $leave_type_id
 * @property int $no_of_leaves
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\LeaveType $leaveType
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota whereLeaveTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota whereNoOfLeaves($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeLeaveQuota whereUserId($value)
 */
	class EmployeeLeaveQuota extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EmployeeSkill
 *
 * @property int $id
 * @property int $user_id
 * @property int $skill_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Skill $skill
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill whereSkillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeSkill whereUserId($value)
 */
	class EmployeeSkill extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EmployeeTeam
 *
 * @property int $id
 * @property int $team_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam query()
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EmployeeTeam whereUserId($value)
 */
	class EmployeeTeam extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Estimate
 *
 * @property int $id
 * @property int $client_id
 * @property string|null $estimate_number
 * @property \Illuminate\Support\Carbon $valid_till
 * @property float $sub_total
 * @property float $discount
 * @property string $discount_type
 * @property float $total
 * @property int|null $currency_id
 * @property string $status
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $send_status
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User $client
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $original_estimate_number
 * @property-read mixed $total_amount
 * @property-read mixed $valid_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EstimateItem[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\AcceptEstimate|null $sign
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereEstimateNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereSendStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereValidTill($value)
 */
	class Estimate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EstimateItem
 *
 * @property int $id
 * @property int $estimate_id
 * @property string $item_name
 * @property string|null $item_summary
 * @property string $type
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereEstimateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EstimateItem whereUpdatedAt($value)
 */
	class EstimateItem extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Event
 *
 * @property int $id
 * @property string $event_name
 * @property string $label_color
 * @property string $where
 * @property string $description
 * @property \Illuminate\Support\Carbon $start_date_time
 * @property \Illuminate\Support\Carbon $end_date_time
 * @property string $repeat
 * @property int|null $repeat_every
 * @property int|null $repeat_cycles
 * @property string $repeat_type
 * @property string $send_reminder
 * @property int|null $remind_time
 * @property string $remind_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EventAttendee[] $attendee
 * @property-read int|null $attendee_count
 * @property-read mixed $icon
 * @method static \Database\Factories\EventFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Event newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Event newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Event query()
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereEndDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereEventName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereLabelColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereRemindTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereRemindType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereRepeat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereRepeatCycles($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereRepeatEvery($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereRepeatType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereSendReminder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereStartDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Event whereWhere($value)
 */
	class Event extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\EventAttendee
 *
 * @property int $id
 * @property int $user_id
 * @property int $event_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee query()
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee whereEventId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EventAttendee whereUserId($value)
 */
	class EventAttendee extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Expense
 *
 * @property int $id
 * @property string $item_name
 * @property \Illuminate\Support\Carbon $purchase_date
 * @property string|null $purchase_from
 * @property float $price
 * @property int $currency_id
 * @property int|null $project_id
 * @property string|null $bill
 * @property int $user_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $can_claim
 * @property int|null $category_id
 * @property int|null $expenses_recurring_id
 * @property int|null $created_by
 * @property string|null $description
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Currency $currency
 * @property-read mixed $bill_url
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $purchase_on
 * @property-read mixed $total_amount
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|Expense[] $recurrings
 * @property-read int|null $recurrings_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\ExpenseFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereBill($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCanClaim($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereExpensesRecurringId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense wherePurchaseFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereUserId($value)
 */
	class Expense extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ExpenseRecurring
 *
 * @property int $id
 * @property int|null $category_id
 * @property int|null $currency_id
 * @property int|null $project_id
 * @property int|null $user_id
 * @property int|null $created_by
 * @property string $item_name
 * @property int|null $day_of_month
 * @property int|null $day_of_week
 * @property string|null $payment_method
 * @property string $rotation
 * @property int|null $billing_cycle
 * @property int $unlimited_recurring
 * @property float $price
 * @property string|null $bill
 * @property string $status
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ExpensesCategory|null $category
 * @property-read \App\Models\User|null $createdBy
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $bill_url
 * @property-read mixed $created_on
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $total_amount
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Expense[] $recurrings
 * @property-read int|null $recurrings_count
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereBill($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereDayOfMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereDayOfWeek($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereRotation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereUnlimitedRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpenseRecurring whereUserId($value)
 */
	class ExpenseRecurring extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ExpensesCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Expense[] $expense
 * @property-read int|null $expense_count
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpensesCategory whereUpdatedAt($value)
 */
	class ExpensesCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\GdprSetting
 *
 * @property int $id
 * @property int $enable_gdpr
 * @property int $show_customer_area
 * @property int $show_customer_footer
 * @property string|null $top_information_block
 * @property int $enable_export
 * @property int $data_removal
 * @property int $lead_removal_public_form
 * @property int $terms_customer_footer
 * @property string|null $terms
 * @property string|null $policy
 * @property int $public_lead_edit
 * @property int $consent_customer
 * @property int $consent_leads
 * @property string|null $consent_block
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereConsentBlock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereConsentCustomer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereConsentLeads($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereDataRemoval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereEnableExport($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereEnableGdpr($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereLeadRemovalPublicForm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting wherePolicy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting wherePublicLeadEdit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereShowCustomerArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereShowCustomerFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereTerms($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereTermsCustomerFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereTopInformationBlock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GdprSetting whereUpdatedAt($value)
 */
	class GdprSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property \Illuminate\Support\Carbon $date
 * @property string|null $occassion
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $addedBy
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday query()
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereOccassion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereUpdatedAt($value)
 */
	class Holiday extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Invoice
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $client_id
 * @property string $invoice_number
 * @property \Illuminate\Support\Carbon $issue_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property float $sub_total
 * @property float $discount
 * @property string $discount_type
 * @property float $total
 * @property int|null $currency_id
 * @property string $status
 * @property string $recurring
 * @property int|null $billing_cycle
 * @property int|null $billing_interval
 * @property string|null $billing_frequency
 * @property string|null $file
 * @property string|null $file_original_name
 * @property string|null $note
 * @property int $credit_note
 * @property string $show_shipping_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $estimate_id
 * @property int $send_status
 * @property float $due_amount
 * @property int|null $parent_id
 * @property int|null $invoice_recurring_id
 * @property int|null $created_by
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CreditNotes[] $creditNotes
 * @property-read int|null $credit_notes_count
 * @property-read \App\Models\Currency|null $currency
 * @property-read \App\Models\Estimate|null $estimate
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $issue_on
 * @property-read mixed $original_invoice_number
 * @property-read mixed $total_amount
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InvoiceItems[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payment
 * @property-read int|null $payment_count
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|Invoice[] $recurrings
 * @property-read int|null $recurrings_count
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillingFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereBillingInterval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCreditNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDueAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereEstimateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereInvoiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereInvoiceRecurringId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereSendStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereShowShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereUpdatedAt($value)
 */
	class Invoice extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\InvoiceItems
 *
 * @property int $id
 * @property int $invoice_id
 * @property string $item_name
 * @property string|null $item_summary
 * @property string $type
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereUpdatedAt($value)
 */
	class InvoiceItems extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\InvoiceSetting
 *
 * @property int $id
 * @property string $invoice_prefix
 * @property int $invoice_digit
 * @property string $estimate_prefix
 * @property int $estimate_digit
 * @property string $credit_note_prefix
 * @property int $credit_note_digit
 * @property string $template
 * @property int $due_after
 * @property string $invoice_terms
 * @property string|null $gst_number
 * @property string|null $show_gst
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $logo
 * @property int $send_reminder
 * @property string|null $locale
 * @property int $hsn_sac_code_show
 * @property-read mixed $icon
 * @property-read mixed $logo_url
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereCreditNoteDigit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereCreditNotePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereDueAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereEstimateDigit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereEstimatePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereGstNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereHsnSacCodeShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereInvoiceDigit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereInvoicePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereInvoiceTerms($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereSendReminder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereShowGst($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceSetting whereUpdatedAt($value)
 */
	class InvoiceSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Issue
 *
 * @property int $id
 * @property string $description
 * @property int|null $user_id
 * @property int|null $project_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue query()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereUserId($value)
 */
	class Issue extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LanguageSetting
 *
 * @property int $id
 * @property string $language_code
 * @property string $language_name
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting whereLanguageCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting whereLanguageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LanguageSetting whereUpdatedAt($value)
 */
	class LanguageSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Lead
 *
 * @property int $id
 * @property int|null $client_id
 * @property int|null $source_id
 * @property int|null $status_id
 * @property int $column_priority
 * @property int|null $agent_id
 * @property string|null $company_name
 * @property string|null $website
 * @property string|null $address
 * @property string|null $salutation
 * @property string $client_name
 * @property string $client_email
 * @property string|null $mobile
 * @property string|null $cell
 * @property string|null $office
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $postal_code
 * @property string|null $note
 * @property string $next_follow_up
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float|null $value
 * @property int|null $currency_id
 * @property int|null $category_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\Currency|null $currency
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LeadFiles[] $files
 * @property-read int|null $files_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LeadFollowUp[] $follow
 * @property-read int|null $follow_count
 * @property-read \App\Models\LeadFollowUp|null $followup
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $image_url
 * @property-read \App\Models\LeadAgent|null $leadAgent
 * @property-read \App\Models\LeadSource|null $leadSource
 * @property-read \App\Models\LeadStatus|null $leadStatus
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\LeadFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereClientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereClientName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereColumnPriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereNextFollowUp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereSalutation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereSourceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lead whereWebsite($value)
 */
	class Lead extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeadAgent
 *
 * @property int $id
 * @property int $user_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadAgent whereUserId($value)
 */
	class LeadAgent extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeadCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereUpdatedAt($value)
 */
	class LeadCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeadCustomForm
 *
 * @property int $id
 * @property string $field_display_name
 * @property string $field_name
 * @property int $field_order
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereFieldDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereFieldName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereFieldOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCustomForm whereUpdatedAt($value)
 */
	class LeadCustomForm extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property int $lead_id
 * @property int $user_id
 * @property string $filename
 * @property string $hashname
 * @property string $size
 * @property string|null $description
 * @property string|null $google_url
 * @property string|null $dropbox_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @property-read \App\Models\Lead $lead
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFiles whereUserId($value)
 */
	class LeadFiles extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeadFollowUp
 *
 * @property int $id
 * @property int $lead_id
 * @property string|null $remark
 * @property \Illuminate\Support\Carbon|null $next_follow_up_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Lead $lead
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereNextFollowUpDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadFollowUp whereUpdatedAt($value)
 */
	class LeadFollowUp extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeadSource
 *
 * @property int $id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Lead[] $leads
 * @property-read int|null $leads_count
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereUpdatedAt($value)
 */
	class LeadSource extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeadStatus
 *
 * @property int $id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $priority
 * @property int $default
 * @property string $label_color
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Lead[] $leads
 * @property-read int|null $leads_count
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus whereDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus whereLabelColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadStatus whereUpdatedAt($value)
 */
	class LeadStatus extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Leave
 *
 * @property int $id
 * @property int $user_id
 * @property int $leave_type_id
 * @property string $duration
 * @property \Illuminate\Support\Carbon $leave_date
 * @property string $reason
 * @property string $status
 * @property string|null $reject_reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $paid
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $date
 * @property-read mixed $icon
 * @property-read mixed $leaves_taken_count
 * @property-read \App\Models\LeaveType $type
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\LeaveFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Leave newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Leave query()
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereLeaveDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereLeaveTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave wherePaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereRejectReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereUserId($value)
 */
	class Leave extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LeaveType
 *
 * @property int $id
 * @property string $type_name
 * @property string $color
 * @property int $no_of_leaves
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $paid
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Leave[] $leaves
 * @property-read int|null $leaves_count
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType whereNoOfLeaves($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType wherePaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType whereTypeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeaveType whereUpdatedAt($value)
 */
	class LeaveType extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property string $log_time_for
 * @property string $auto_timer_stop
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $approval_required
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor query()
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereApprovalRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereAutoTimerStop($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereLogTimeFor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereUpdatedAt($value)
 */
	class LogTimeFor extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Menu
 *
 * @property int $id
 * @property string $menu_name
 * @property string|null $translate_name
 * @property string|null $route
 * @property string|null $module
 * @property string|null $icon
 * @property int|null $setting_menu
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Menu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu query()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereMenuName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereModule($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereRoute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereSettingMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereTranslateName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereUpdatedAt($value)
 */
	class Menu extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\MenuSetting
 *
 * @property int $id
 * @property string|null $main_menu
 * @property string|null $default_main_menu
 * @property string|null $setting_menu
 * @property string|null $default_setting_menu
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereDefaultMainMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereDefaultSettingMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereMainMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereSettingMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereUpdatedAt($value)
 */
	class MenuSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\MessageSetting
 *
 * @property int $id
 * @property string $allow_client_admin
 * @property string $allow_client_employee
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereAllowClientAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereAllowClientEmployee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereUpdatedAt($value)
 */
	class MessageSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Module
 *
 * @property int $id
 * @property string $module_name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission[] $customPermissions
 * @property-read int|null $custom_permissions_count
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission[] $permissions
 * @property-read int|null $permissions_count
 * @method static \Illuminate\Database\Eloquent\Builder|Module newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Module newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Module query()
 * @method static \Illuminate\Database\Eloquent\Builder|Module whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Module whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Module whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Module whereModuleName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Module whereUpdatedAt($value)
 */
	class Module extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ModuleSetting
 *
 * @property int $id
 * @property string $module_name
 * @property string $status
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereModuleName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereUpdatedAt($value)
 */
	class ModuleSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Notice
 *
 * @property int $id
 * @property string $to
 * @property string $heading
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $department_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Team|null $department
 * @property-read mixed $icon
 * @property-read mixed $notice_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\NoticeView[] $member
 * @property-read int|null $member_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\NoticeFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereDepartmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereUpdatedAt($value)
 */
	class Notice extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\NoticeView
 *
 * @property int $id
 * @property int $notice_id
 * @property int $user_id
 * @property int $read
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView query()
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereNoticeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereUserId($value)
 */
	class NoticeView extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Notification
 *
 * @property int $id
 * @property string $type
 * @property string $notifiable_type
 * @property int $notifiable_id
 * @property string $data
 * @property string|null $read_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereNotifiableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereNotifiableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereReadAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereUpdatedAt($value)
 */
	class Notification extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\OfflinePaymentMethod
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod query()
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OfflinePaymentMethod whereUpdatedAt($value)
 */
	class OfflinePaymentMethod extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Payment
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $invoice_id
 * @property float $amount
 * @property string|null $gateway
 * @property string|null $transaction_id
 * @property int|null $currency_id
 * @property string|null $plan_id
 * @property string|null $customer_id
 * @property string|null $event_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $paid_on
 * @property string|null $remarks
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $offline_method_id
 * @property string|null $bill
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @property-read mixed $paid_date
 * @property-read mixed $total_amount
 * @property-read \App\Models\Invoice|null $invoice
 * @property-read \App\Models\OfflinePaymentMethod|null $offlineMethod
 * @property-read \App\Models\Project|null $project
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereBill($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereEventId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereGateway($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereOfflineMethodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePaidOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment wherePlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereUpdatedAt($value)
 */
	class Payment extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PaymentGatewayCredentials
 *
 * @property int $id
 * @property string|null $paypal_client_id
 * @property string|null $paypal_secret
 * @property string $paypal_status
 * @property string|null $stripe_client_id
 * @property string|null $stripe_secret
 * @property string|null $stripe_webhook_secret
 * @property string $stripe_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $razorpay_key
 * @property string|null $razorpay_secret
 * @property string $razorpay_status
 * @property string $paypal_mode
 * @property string|null $sandbox_paypal_client_id
 * @property string|null $sandbox_paypal_secret
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpayKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpaySecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpayStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSandboxPaypalClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSandboxPaypalSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeWebhookSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereUpdatedAt($value)
 */
	class PaymentGatewayCredentials extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Permission
 *
 * @property int $id
 * @property string $name
 * @property string|null $display_name
 * @property string|null $description
 * @property int $module_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $is_custom
 * @property-read \App\Models\Module $module
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission query()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereIsCustom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereModuleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereUpdatedAt($value)
 */
	class Permission extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PermissionRole
 *
 * @property int $permission_id
 * @property int $role_id
 * @property int $permission_type_id
 * @property-read mixed $icon
 * @property-read \App\Models\PermissionType $permissionType
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole wherePermissionTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole whereRoleId($value)
 */
	class PermissionRole extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PermissionType
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType query()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereUpdatedAt($value)
 */
	class PermissionType extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Pinned
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Project|null $project
 * @property-read \App\Models\Task|null $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereUserId($value)
 */
	class Pinned extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Product
 *
 * @property int $id
 * @property string $name
 * @property string $price
 * @property string|null $taxes
 * @property int $allow_purchase
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $description
 * @property int|null $category_id
 * @property int|null $sub_category_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @property-read mixed $total_amount
 * @property-read \App\Models\Tax $tax
 * @method static \Database\Factories\ProductFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereAllowPurchase($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereSubCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUpdatedAt($value)
 */
	class Product extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProductCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductCategory whereUpdatedAt($value)
 */
	class ProductCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProductSubCategory
 *
 * @property int $id
 * @property int $category_id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProductCategory $category
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereUpdatedAt($value)
 */
	class ProductSubCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Project
 *
 * @property int $id
 * @property string $project_name
 * @property string|null $project_summary
 * @property int|null $project_admin
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon|null $deadline
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectNote[] $notes
 * @property int|null $category_id
 * @property int|null $client_id
 * @property int|null $team_id
 * @property string|null $feedback
 * @property string $manual_timelog
 * @property string $client_view_task
 * @property string $allow_client_notification
 * @property int $completion_percent
 * @property string $calculate_task_progress
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property float|null $project_budget
 * @property int|null $currency_id
 * @property float|null $hours_allocated
 * @property string $status
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\ProjectCategory|null $category
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \App\Models\Currency|null $currency
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Discussion[] $discussions
 * @property-read int|null $discussions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Expense[] $expenses
 * @property-read int|null $expenses_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $is_project_admin
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Invoice[] $invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Issue[] $issues
 * @property-read int|null $issues_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectMember[] $members
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $membersMany
 * @property-read int|null $members_many_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectMilestone[] $milestones
 * @property-read int|null $milestones_count
 * @property-read int|null $notes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\ProjectRating|null $rating
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $times
 * @property-read int|null $times_count
 * @method static \Illuminate\Database\Eloquent\Builder|Project canceled()
 * @method static \Illuminate\Database\Eloquent\Builder|Project completed()
 * @method static \Database\Factories\ProjectFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Project finished()
 * @method static \Illuminate\Database\Eloquent\Builder|Project inProcess()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project notStarted()
 * @method static \Illuminate\Database\Eloquent\Builder|Project onHold()
 * @method static \Illuminate\Database\Query\Builder|Project onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Project overdue()
 * @method static \Illuminate\Database\Eloquent\Builder|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereAllowClientNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCalculateTaskProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereClientViewTask($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCompletionPercent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereHoursAllocated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereManualTimelog($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectBudget($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Project withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Project withoutTrashed()
 */
	class Project extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectActivity
 *
 * @property int $id
 * @property int $project_id
 * @property string $activity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereUpdatedAt($value)
 */
	class ProjectActivity extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project[] $project
 * @property-read int|null $project_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereUpdatedAt($value)
 */
	class ProjectCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectFile
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property string $filename
 * @property string|null $hashname
 * @property string|null $size
 * @property string|null $description
 * @property string|null $google_url
 * @property string|null $dropbox_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $external_link_name
 * @property string|null $external_link
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereExternalLinkName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectFile whereUserId($value)
 */
	class ProjectFile extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectMember
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $hourly_rate
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project $project
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereUserId($value)
 */
	class ProjectMember extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectMilestone
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $currency_id
 * @property string $milestone_title
 * @property string $summary
 * @property float $cost
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $invoice_created
 * @property int|null $invoice_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereInvoiceCreated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereMilestoneTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereUpdatedAt($value)
 */
	class ProjectMilestone extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectNote
 *
 * @property int $id
 * @property int|null $project_id
 * @property string $title
 * @property int $type
 * @property int|null $client_id
 * @property int $is_client_show
 * @property int $ask_password
 * @property string $details
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectUserNote[] $members
 * @property-read int|null $members_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereAskPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereIsClientShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereUpdatedAt($value)
 */
	class ProjectNote extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectRating
 *
 * @property int $id
 * @property int $project_id
 * @property float $rating
 * @property string|null $comment
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereUserId($value)
 */
	class ProjectRating extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectSetting
 *
 * @property int $id
 * @property string $send_reminder
 * @property int $remind_time
 * @property string $remind_type
 * @property string $remind_to
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereRemindTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereRemindTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereRemindType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereSendReminder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectSetting whereUpdatedAt($value)
 */
	class ProjectSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectTemplate
 *
 * @property int $id
 * @property string $project_name
 * @property int|null $category_id
 * @property int|null $client_id
 * @property string|null $project_summary
 * @property string|null $notes
 * @property string|null $feedback
 * @property string $client_view_task
 * @property string $allow_client_notification
 * @property string $manual_timelog
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProjectCategory|null $category
 * @property-read \App\Models\User|null $client
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateMember[] $members
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateTask[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereAllowClientNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereClientViewTask($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereManualTimelog($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereProjectSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereUpdatedAt($value)
 */
	class ProjectTemplate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectTemplateMember
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_template_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\ProjectTemplate $projectTemplate
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereProjectTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereUserId($value)
 */
	class ProjectTemplateMember extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectTemplateSubTask
 *
 * @property int $id
 * @property int $project_template_task_id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\ProjectTemplateTask $task
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereProjectTemplateTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereUpdatedAt($value)
 */
	class ProjectTemplateSubTask extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectTemplateTask
 *
 * @property int $id
 * @property string $heading
 * @property string|null $description
 * @property int $project_template_id
 * @property string $priority
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $project_template_task_category_id
 * @property-read mixed $icon
 * @property-read \App\Models\ProjectTemplate $projectTemplate
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateSubTask[] $subtasks
 * @property-read int|null $subtasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateTaskUser[] $users
 * @property-read int|null $users_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $usersMany
 * @property-read int|null $users_many_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereProjectTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereProjectTemplateTaskCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereUpdatedAt($value)
 */
	class ProjectTemplateTask extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectTemplateTaskUser
 *
 * @property int $id
 * @property int $project_template_task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProjectTemplateTask $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereProjectTemplateTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereUserId($value)
 */
	class ProjectTemplateTaskUser extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectTimeLog
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $start_time
 * @property \Illuminate\Support\Carbon|null $end_time
 * @property string $memo
 * @property string|null $total_hours
 * @property string|null $total_minutes
 * @property int|null $edited_by_user
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $hourly_rate
 * @property int $earnings
 * @property int $approved
 * @property int|null $approved_by
 * @property int|null $invoice_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $editor
 * @property-read mixed $duration
 * @property-read mixed $hours
 * @property-read mixed $icon
 * @property-read mixed $timer
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @property-read \App\Models\Task|null $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereEarnings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereEditedByUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereMemo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTotalHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTotalMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereUserId($value)
 */
	class ProjectTimeLog extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProjectUserNote
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_note_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereProjectNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereUserId($value)
 */
	class ProjectUserNote extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Proposal
 *
 * @property int $id
 * @property int $lead_id
 * @property \Illuminate\Support\Carbon $valid_till
 * @property float $sub_total
 * @property float $total
 * @property int|null $currency_id
 * @property string $discount_type
 * @property float $discount
 * @property int $invoice_convert
 * @property string $status
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $client_comment
 * @property int $signature_approval
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProposalItem[] $items
 * @property-read int|null $items_count
 * @property-read \App\Models\Lead $lead
 * @property-read \App\Models\ProposalSign|null $signature
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal query()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereClientComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereInvoiceConvert($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereSignatureApproval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereValidTill($value)
 */
	class Proposal extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProposalItem
 *
 * @property int $id
 * @property int $proposal_id
 * @property string $item_name
 * @property string $type
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $item_summary
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereProposalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalItem whereUpdatedAt($value)
 */
	class ProposalItem extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProposalSign
 *
 * @property int $id
 * @property int $proposal_id
 * @property string $full_name
 * @property string $email
 * @property string $signature
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereProposalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereUpdatedAt($value)
 */
	class ProposalSign extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PurposeConsent
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\PurposeConsentLead|null $lead
 * @property-read \App\Models\PurposeConsentUser|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereUpdatedAt($value)
 */
	class PurposeConsent extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PurposeConsentLead
 *
 * @property int $id
 * @property int $lead_id
 * @property int $purpose_consent_id
 * @property string $status
 * @property string|null $ip
 * @property int|null $updated_by_id
 * @property string|null $additional_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereAdditionalDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead wherePurposeConsentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereUpdatedById($value)
 */
	class PurposeConsentLead extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PurposeConsentUser
 *
 * @property int $id
 * @property int $client_id
 * @property int $purpose_consent_id
 * @property string $status
 * @property string|null $ip
 * @property int $updated_by_id
 * @property string|null $additional_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereAdditionalDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser wherePurposeConsentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereUpdatedById($value)
 */
	class PurposeConsentUser extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PushNotificationSetting
 *
 * @property int $id
 * @property string|null $onesignal_app_id
 * @property string|null $onesignal_rest_api_key
 * @property string|null $notification_logo
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read mixed $notification_logo_url
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereNotificationLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereOnesignalAppId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereOnesignalRestApiKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PushNotificationSetting whereUpdatedAt($value)
 */
	class PushNotificationSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PusherSetting
 *
 * @property int $id
 * @property string|null $pusher_app_id
 * @property string|null $pusher_app_key
 * @property string|null $pusher_app_secret
 * @property string|null $pusher_cluster
 * @property int $force_tls
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereForceTls($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherAppId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherAppKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherAppSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherCluster($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereUpdatedAt($value)
 */
	class PusherSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\RecurringInvoice
 *
 * @property int $id
 * @property int|null $currency_id
 * @property int|null $project_id
 * @property int|null $client_id
 * @property int|null $user_id
 * @property int|null $created_by
 * @property \Illuminate\Support\Carbon $issue_date
 * @property \Illuminate\Support\Carbon $due_date
 * @property float $sub_total
 * @property float $total
 * @property float $discount
 * @property string $discount_type
 * @property string $status
 * @property string|null $file
 * @property string|null $file_original_name
 * @property string|null $note
 * @property string $show_shipping_address
 * @property int|null $day_of_month
 * @property int|null $day_of_week
 * @property string|null $payment_method
 * @property string $rotation
 * @property int|null $billing_cycle
 * @property int $client_can_stop
 * @property int $unlimited_recurring
 * @property string|null $deleted_at
 * @property string|null $shipping_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read mixed $issue_on
 * @property-read mixed $total_amount
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RecurringInvoiceItems[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Invoice[] $recurrings
 * @property-read int|null $recurrings_count
 * @property-read \App\Models\User|null $withoutGlobalScopeCompanyClient
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereBillingCycle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereClientCanStop($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDayOfMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDayOfWeek($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereRotation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereShowShippingAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereUnlimitedRecurring($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoice whereUserId($value)
 */
	class RecurringInvoice extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\RecurringInvoiceItems
 *
 * @property int $id
 * @property int $invoice_recurring_id
 * @property string $item_name
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $taxes
 * @property string $type
 * @property string|null $item_summary
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems query()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereInvoiceRecurringId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereUpdatedAt($value)
 */
	class RecurringInvoiceItems extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\RemovalRequest
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int|null $user_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequest whereUserId($value)
 */
	class RemovalRequest extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\RemovalRequestLead
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int|null $lead_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Lead|null $lead
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead query()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereUpdatedAt($value)
 */
	class RemovalRequestLead extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Role
 *
 * @property int $id
 * @property string $name
 * @property string|null $display_name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PermissionRole[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission[] $perms
 * @property-read int|null $perms_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RoleUser[] $roleuser
 * @property-read int|null $roleuser_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\RoleUser
 *
 * @property int $user_id
 * @property int $role_id
 * @property-read mixed $icon
 * @property-read \App\Models\Role $role
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|RoleUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleUser whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleUser whereUserId($value)
 */
	class RoleUser extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Session
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string $payload
 * @property int $last_activity
 * @method static \Illuminate\Database\Eloquent\Builder|Session newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Session newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Session query()
 * @method static \Illuminate\Database\Eloquent\Builder|Session whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Session whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Session whereLastActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Session wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Session whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Session whereUserId($value)
 */
	class Session extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Setting
 *
 * @property int $id
 * @property string $company_name
 * @property string $company_email
 * @property string $company_phone
 * @property string|null $logo
 * @property string|null $login_background
 * @property string $address
 * @property string|null $website
 * @property int|null $currency_id
 * @property string $timezone
 * @property string $date_format
 * @property string|null $date_picker_format
 * @property string|null $moment_format
 * @property string $time_format
 * @property string $locale
 * @property string $latitude
 * @property string $longitude
 * @property string $leaves_start_from
 * @property string $active_theme
 * @property int|null $last_updated_by
 * @property string|null $currency_converter_key
 * @property string|null $google_map_key
 * @property string $task_self
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $weather_key
 * @property string|null $purchase_code
 * @property string|null $supported_until
 * @property string $google_recaptcha_status
 * @property string $google_recaptcha_v2_status
 * @property string|null $google_recaptcha_v2_site_key
 * @property string|null $google_recaptcha_v2_secret_key
 * @property string $google_recaptcha_v3_status
 * @property string|null $google_recaptcha_v3_site_key
 * @property string|null $google_recaptcha_v3_secret_key
 * @property int $app_debug
 * @property int $rounded_theme
 * @property int $hide_cron_message
 * @property int $system_update
 * @property string $logo_background_color
 * @property int $before_days
 * @property int $after_days
 * @property string $on_deadline
 * @property int $default_task_status
 * @property int $show_review_modal
 * @property int $dashboard_clock
 * @property int $taskboard_length
 * @property string|null $favicon
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $dark_logo_url
 * @property-read mixed $favicon_url
 * @property-read mixed $icon
 * @property-read mixed $light_logo_url
 * @property-read mixed $login_background_url
 * @property-read mixed $logo_url
 * @property-read mixed $moment_date_format
 * @property-read mixed $show_public_message
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereActiveTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereAfterDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereAppDebug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereBeforeDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCompanyEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCompanyPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCurrencyConverterKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereDashboardClock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereDateFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereDatePickerFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereDefaultTaskStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereFavicon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleMapKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaV2SecretKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaV2SiteKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaV2Status($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaV3SecretKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaV3SiteKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereGoogleRecaptchaV3Status($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereHideCronMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLeavesStartFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLoginBackground($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLogoBackgroundColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereMomentFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereOnDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting wherePurchaseCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereRoundedTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereShowReviewModal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereSupportedUntil($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereSystemUpdate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereTaskSelf($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereTaskboardLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereTimeFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereTimezone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereWeatherKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereWebsite($value)
 */
	class Setting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Skill
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Skill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Skill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Skill query()
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Skill whereUpdatedAt($value)
 */
	class Skill extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SlackSetting
 *
 * @property int $id
 * @property string|null $slack_webhook
 * @property string|null $slack_logo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $status
 * @property-read mixed $icon
 * @property-read mixed $slack_logo_url
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereSlackLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereSlackWebhook($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereUpdatedAt($value)
 */
	class SlackSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SmtpSetting
 *
 * @property int $id
 * @property string $mail_driver
 * @property string $mail_host
 * @property string $mail_port
 * @property string $mail_username
 * @property string $mail_password
 * @property string $mail_from_name
 * @property string $mail_from_email
 * @property string|null $mail_encryption
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $verified
 * @property-read mixed $icon
 * @property-read mixed $set_smtp_message
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailDriver($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailEncryption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailFromEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailFromName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailPort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereVerified($value)
 */
	class SmtpSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Social
 *
 * @property int $id
 * @property int|null $user_id
 * @property string $social_id
 * @property string $social_service
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Social newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Social newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Social query()
 * @method static \Illuminate\Database\Eloquent\Builder|Social whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Social whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Social whereSocialId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Social whereSocialService($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Social whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Social whereUserId($value)
 */
	class Social extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SocialAuthSetting
 *
 * @property int $id
 * @property string|null $facebook_client_id
 * @property string|null $facebook_secret_id
 * @property string $facebook_status
 * @property string|null $google_client_id
 * @property string|null $google_secret_id
 * @property string $google_status
 * @property string|null $twitter_client_id
 * @property string|null $twitter_secret_id
 * @property string $twitter_status
 * @property string|null $linkedin_client_id
 * @property string|null $linkedin_secret_id
 * @property string $linkedin_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $social_auth_enable
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereFacebookClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereFacebookSecretId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereFacebookStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereGoogleClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereGoogleSecretId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereGoogleStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereLinkedinClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereLinkedinSecretId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereLinkedinStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereTwitterClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereTwitterSecretId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereTwitterStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialAuthSetting whereUpdatedAt($value)
 */
	class SocialAuthSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * Class StickyNote
 *
 * @package App
 * @property int $id
 * @property int $user_id
 * @property string $note_text
 * @property string $colour
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $userDetail
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereNoteText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereUserId($value)
 */
	class StickyNote extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\StorageSetting
 *
 * @property int $id
 * @property string $filesystem
 * @property string|null $auth_keys
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting whereAuthKeys($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting whereFilesystem($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StorageSetting whereUpdatedAt($value)
 */
	class StorageSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SubTask
 *
 * @property int $id
 * @property int $task_id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property string|null $start_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Task $task
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereUpdatedAt($value)
 */
	class SubTask extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Task
 *
 * @property int $id
 * @property string $heading
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $due_date
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property int|null $project_id
 * @property int|null $task_category_id
 * @property string $priority
 * @property string $status
 * @property int|null $board_column_id
 * @property int $column_priority
 * @property \Illuminate\Support\Carbon|null $completed_on
 * @property int|null $created_by
 * @property int|null $recurring_task_id
 * @property int|null $dependent_task_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $milestone_id
 * @property int $is_private
 * @property int $billable
 * @property int $estimate_hours
 * @property int $estimate_minutes
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $activeTimerAll
 * @property-read int|null $active_timer_all_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $approvedTimeLogs
 * @property-read int|null $approved_time_logs_count
 * @property-read \App\Models\TaskboardColumn|null $boardColumn
 * @property-read \App\Models\TaskCategory|null $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskComment[] $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTask[] $completedSubtasks
 * @property-read int|null $completed_subtasks_count
 * @property-read \App\Models\User|null $createBy
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $create_on
 * @property-read string $due_on
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $is_task_user
 * @property-read mixed $total_estimated_minutes
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskHistory[] $history
 * @property-read int|null $history_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTask[] $incompleteSubtasks
 * @property-read int|null $incomplete_subtasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskLabel[] $label
 * @property-read int|null $label_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskLabelList[] $labels
 * @property-read int|null $labels_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskNote[] $notes
 * @property-read int|null $notes_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTask[] $subtasks
 * @property-read int|null $subtasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $timeLogged
 * @property-read int|null $time_logged_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Task newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Task query()
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereBillable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereColumnPriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCompletedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDependentTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereEstimateHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereEstimateMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereIsPrivate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereMilestoneId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRecurringTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereTaskCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereUpdatedAt($value)
 */
	class Task extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereUpdatedAt($value)
 */
	class TaskCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskComment
 *
 * @property int $id
 * @property string $comment
 * @property int $user_id
 * @property int $task_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Task $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskComment whereUserId($value)
 */
	class TaskComment extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskFile
 *
 * @property int $id
 * @property int $user_id
 * @property int $task_id
 * @property string $filename
 * @property string|null $description
 * @property string|null $google_url
 * @property string|null $hashname
 * @property string|null $size
 * @property string|null $dropbox_link
 * @property string|null $external_link
 * @property string|null $external_link_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereExternalLinkName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskFile whereUserId($value)
 */
	class TaskFile extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskHistory
 *
 * @property int $id
 * @property int $task_id
 * @property int|null $sub_task_id
 * @property int $user_id
 * @property string $details
 * @property int|null $board_column_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\TaskboardColumn|null $boardColumn
 * @property-read mixed $icon
 * @property-read \App\Models\SubTask|null $subTask
 * @property-read \App\Models\Task $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereSubTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskHistory whereUserId($value)
 */
	class TaskHistory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskLabel
 *
 * @property int $id
 * @property int $label_id
 * @property int $task_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\TaskLabelList $label
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereLabelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereUpdatedAt($value)
 */
	class TaskLabel extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskLabelList
 *
 * @property int $id
 * @property string $label_name
 * @property string|null $color
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read mixed $label_color
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereLabelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereUpdatedAt($value)
 */
	class TaskLabelList extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskNote
 *
 * @property int $id
 * @property int $task_id
 * @property int|null $user_id
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Task $task
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereUserId($value)
 */
	class TaskNote extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskTag
 *
 * @property-read mixed $icon
 * @property-read \App\Models\TaskTagList $tag
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTag query()
 */
	class TaskTag extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskTagList
 *
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTagList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTagList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTagList query()
 */
	class TaskTagList extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskUser
 *
 * @property int $id
 * @property int $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Task $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereUserId($value)
 */
	class TaskUser extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TaskboardColumn
 *
 * @property int $id
 * @property string $column_name
 * @property string|null $slug
 * @property string $label_color
 * @property int $priority
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn whereColumnName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn whereLabelColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskboardColumn whereUpdatedAt($value)
 */
	class TaskboardColumn extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Tax
 *
 * @property int $id
 * @property string $tax_name
 * @property string $rate_percent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Tax newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tax newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tax query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tax whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tax whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tax whereRatePercent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tax whereTaxName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tax whereUpdatedAt($value)
 */
	class Tax extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Team
 *
 * @property Collection $members
 * @mixin \Eloquent
 * @property int $id
 * @property string $team_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeDetails[] $teamMembers
 * @property-read int|null $team_members_count
 * @method static \Illuminate\Database\Eloquent\Builder|Team newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team query()
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereTeamName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUpdatedAt($value)
 */
	class Team extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ThemeSetting
 *
 * @property int $id
 * @property string $panel
 * @property string $header_color
 * @property string $sidebar_color
 * @property string $sidebar_text_color
 * @property string $link_color
 * @property string|null $user_css
 * @property string $sidebar_theme
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereHeaderColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereLinkColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting wherePanel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereSidebarColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereSidebarTextColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereSidebarTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereUserCss($value)
 */
	class ThemeSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Ticket
 *
 * @property int $id
 * @property int $user_id
 * @property string $subject
 * @property string $status
 * @property string $priority
 * @property int|null $agent_id
 * @property int|null $channel_id
 * @property int|null $type_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $agent
 * @property-read \App\Models\User $client
 * @property-read mixed $created_on
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketReply[] $reply
 * @property-read int|null $reply_count
 * @property-read \App\Models\User $requester
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketTag[] $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketTagList[] $ticketTags
 * @property-read int|null $ticket_tags_count
 * @method static \Database\Factories\TicketFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket newQuery()
 * @method static \Illuminate\Database\Query\Builder|Ticket onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereChannelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Ticket withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Ticket withoutTrashed()
 */
	class Ticket extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketAgentGroups
 *
 * @property int $id
 * @property int $agent_id
 * @property int|null $group_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\TicketGroup|null $group
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereUpdatedAt($value)
 */
	class TicketAgentGroups extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketChannel
 *
 * @property int $id
 * @property string $channel_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $tickets
 * @property-read int|null $tickets_count
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel whereChannelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketChannel whereUpdatedAt($value)
 */
	class TicketChannel extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketCustomForm
 *
 * @property int $id
 * @property string $field_display_name
 * @property string $field_name
 * @property string $field_type
 * @property int $field_order
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereFieldType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketCustomForm whereUpdatedAt($value)
 */
	class TicketCustomForm extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketFile
 *
 * @property int $id
 * @property int $user_id
 * @property int $ticket_reply_id
 * @property string $filename
 * @property string|null $description
 * @property string|null $google_url
 * @property string|null $hashname
 * @property string|null $size
 * @property string|null $dropbox_link
 * @property string|null $external_link
 * @property string|null $external_link_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @property-read \App\Models\TicketReply $reply
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereDropboxLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereExternalLinkName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereGoogleUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereHashname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereTicketReplyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketFile whereUserId($value)
 */
	class TicketFile extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketGroup
 *
 * @property int $id
 * @property string $group_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketAgentGroups[] $agents
 * @property-read int|null $agents_count
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereGroupName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereUpdatedAt($value)
 */
	class TicketGroup extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketReply
 *
 * @property int $id
 * @property int $ticket_id
 * @property int $user_id
 * @property string|null $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $icon
 * @property-read \App\Models\Ticket $ticket
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply newQuery()
 * @method static \Illuminate\Database\Query\Builder|TicketReply onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereTicketId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReply whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|TicketReply withTrashed()
 * @method static \Illuminate\Database\Query\Builder|TicketReply withoutTrashed()
 */
	class TicketReply extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketReplyTemplate
 *
 * @property int $id
 * @property string $reply_heading
 * @property string $reply_text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereReplyHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereReplyText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereUpdatedAt($value)
 */
	class TicketReplyTemplate extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketTag
 *
 * @property int $id
 * @property int $tag_id
 * @property int $ticket_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\TicketTagList $tag
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereTagId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereTicketId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereUpdatedAt($value)
 */
	class TicketTag extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketTagList
 *
 * @property int $id
 * @property string $tag_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList whereTagName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTagList whereUpdatedAt($value)
 */
	class TicketTagList extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TicketType
 *
 * @property int $id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $tickets
 * @property-read int|null $tickets_count
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketType whereUpdatedAt($value)
 */
	class TicketType extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UniversalSearch
 *
 * @property int $id
 * @property int $searchable_id
 * @property string|null $module_type
 * @property string $title
 * @property string $route_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch query()
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereModuleType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereRouteName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereSearchableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereUpdatedAt($value)
 */
	class UniversalSearch extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $remember_token
 * @property string|null $image
 * @property string|null $mobile
 * @property string $gender
 * @property string $locale
 * @property string $status
 * @property string $login
 * @property string|null $onesignal_player_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $last_login
 * @property int $email_notifications
 * @property int|null $country_id
 * @property int $dark_theme
 * @property int $rtl
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketAgentGroups[] $agent
 * @property-read int|null $agent_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $agents
 * @property-read int|null $agents_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Attendance[] $attendance
 * @property-read int|null $attendance_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EventAttendee[] $attendee
 * @property-read int|null $attendee_count
 * @property-read \App\Models\ClientDetails|null $clientDetails
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Contract[] $contracts
 * @property-read int|null $contracts_count
 * @property-read \App\Models\Country|null $country
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeDocument[] $documents
 * @property-read int|null $documents_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeDetails[] $employee
 * @property-read int|null $employee_count
 * @property-read \App\Models\EmployeeDetails|null $employeeDetail
 * @property-read \App\Models\EmployeeDetails|null $employeeDetails
 * @property-read mixed $icon
 * @property-read mixed $image_url
 * @property-read mixed $modules
 * @property-read mixed $unread_notifications
 * @property-read mixed $user_other_role
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeTeam[] $group
 * @property-read int|null $group_count
 * @property-read \App\Models\Lead|null $lead
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\LeadAgent[] $leadAgent
 * @property-read int|null $lead_agent_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeLeaveQuota[] $leaveTypes
 * @property-read int|null $leave_types_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectMember[] $member
 * @property-read int|null $member_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission[] $permissionTypes
 * @property-read int|null $permission_types_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project[] $projects
 * @property-read int|null $projects_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RoleUser[] $role
 * @property-read int|null $role_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \App\Models\Session|null $session
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\StickyNote[] $sticky
 * @property-read int|null $sticky_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $tickets
 * @property-read int|null $tickets_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserChat[] $userChat
 * @property-read int|null $user_chat_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDarkTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailNotifications($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastLogin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLogin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereOnesignalPlayerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRtl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User withRole(string $role)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\Authenticatable, \Illuminate\Contracts\Auth\Access\Authorizable, \Illuminate\Contracts\Auth\CanResetPassword {}
}

namespace App\Models{
/**
 * App\Models\UserActivity
 *
 * @property int $id
 * @property int $user_id
 * @property string $activity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity whereActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserActivity whereUserId($value)
 */
	class UserActivity extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UserChat
 *
 * @property int $id
 * @property int $user_one
 * @property int $user_id
 * @property string $message
 * @property int|null $from
 * @property int|null $to
 * @property string $message_seen
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $fromUser
 * @property-read mixed $icon
 * @property-read \App\Models\User|null $toUser
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat lastPerGroup(?array $fields = null)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereMessageSeen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserChat whereUserOne($value)
 */
	class UserChat extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UserInvitation
 *
 * @property int $id
 * @property int $user_id
 * @property string $invitation_type
 * @property string|null $email
 * @property string $invitation_code
 * @property string $status
 * @property string|null $email_restriction
 * @property string|null $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereEmailRestriction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereInvitationCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereInvitationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereUserId($value)
 */
	class UserInvitation extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UserLeadboardSetting
 *
 * @property int $id
 * @property int $user_id
 * @property int $board_column_id
 * @property int $collapsed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting whereCollapsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLeadboardSetting whereUserId($value)
 */
	class UserLeadboardSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UserPermission
 *
 * @property int $id
 * @property int $user_id
 * @property int $permission_id
 * @property int $permission_type_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Permission $permission
 * @property-read \App\Models\PermissionType $type
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission wherePermissionTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserPermission whereUserId($value)
 */
	class UserPermission extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UserTaskboardSetting
 *
 * @property int $id
 * @property int $user_id
 * @property int $board_column_id
 * @property int $collapsed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereCollapsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereUserId($value)
 */
	class UserTaskboardSetting extends \Eloquent {}
}

