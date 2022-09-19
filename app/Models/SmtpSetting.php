<?php

namespace App\Models;

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
 * @mixin \Eloquent
 * @property string $mail_connection
 * @method static \Illuminate\Database\Eloquent\Builder|SmtpSetting whereMailConnection($value)
 */
class SmtpSetting extends BaseModel
{
    protected $guarded = ['id'];
    protected $appends = ['set_smtp_message'];

    public function verifySmtp()
    {
        if ($this->mail_driver == 'smtp') {
            try {
                $transport = new \Swift_SmtpTransport($this->mail_host, $this->mail_port, $this->mail_encryption);
                $transport->setUsername($this->mail_username);
                $transport->setPassword($this->mail_password);

                $mailer = new \Swift_Mailer($transport);
                $mailer->getTransport()->start();

                if ($this->verified == 0) {
                    $this->verified = 1;
                    $this->save();
                }

                return [
                    'success' => true,
                    'message' => __('messages.smtpSuccess')
                ];
            } catch (\Swift_TransportException $e) {
                $this->verified = 0;
                $this->save();
                return [
                    'success' => false,
                    'message' => $e->getMessage()
                ];
            } catch (\Exception $e) {
                $this->verified = 0;
                $this->save();
                return [
                    'success' => false,
                    'message' => $e->getMessage()
                ];
            }
        } else {
            return [
                'success' => true,
                'message' => __('messages.smtpSuccess')
            ];
        }
    }

    public function getSetSmtpMessageAttribute()
    {
        if ($this->verified === 0 && $this->mail_driver == 'smtp') {
            return ' <div class="alert alert-danger">
                    ' . __('messages.smtpNotSet') . '
                    <a href="" class="btn btn-info btn-small">Visit SMTP Settings <i
                                class="fa fa-arrow-right"></i></a>
                </div>';
        }

        return null;
    }

}
