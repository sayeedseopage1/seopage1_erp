<?php

namespace App\Models;

use App\Observers\TaskCommentObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Storage;

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
 * @mixin \Eloquent
 */
class TaskComment extends BaseModel
{
    protected $mimeType = [
        'txt' => 'fa-file-alt',
        'htm' => 'fa-file-code',
        'html' => 'fa-file-code',
        'css' => 'fa-file-code-o',
        'js' => 'fa-file-code',
        'json' => 'fa-file-code',
        'xml' => 'fa-file-code',
        'swf' => 'fa-file',
        'CR2' => 'fa-file',
        'flv' => 'fa-file-video',

        // images
        'png' => 'fa-file-image',
        'jpe' => 'fa-file-image',
        'jpeg' => 'fa-file-image',
        'jpg' => 'fa-file-image',
        'gif' => 'fa-file-image',
        'bmp' => 'fa-file-image',
        'ico' => 'fa-file-image',
        'tiff' => 'fa-file-image',
        'tif' => 'fa-file-image',
        'svg' => 'fa-file-image',
        'svgz' => 'fa-file-image',

        // archives
        'zip' => 'fa-file-archive',
        'rar' => 'fa-file-archive',
        'exe' => 'fa-file-archive',
        'msi' => 'fa-file-archive',
        'cab' => 'fa-file-archive',

        // audio/video
        'mp3' => 'fa-file-audio',
        'qt' => 'fa-file-video',
        'mov' => 'fa-file-video',
        'mp4' => 'fa-file-video',
        'mkv' => 'fa-file-video',
        'avi' => 'fa-file-video',
        'wmv' => 'fa-file-video',
        'mpg' => 'fa-file-video',
        'mp2' => 'fa-file-video',
        'mpeg' => 'fa-file-video',
        'mpe' => 'fa-file-video',
        'mpv' => 'fa-file-video',
        '3gp' => 'fa-file-video',
        'm4v' => 'fa-file-video',
        'webm' => 'fa-file-video',

        // adobe
        'pdf' => 'fa-file-pdf',
        'psd' => 'fa-file-image',
        'ai' => 'fa-file',
        'eps' => 'fa-file',
        'ps' => 'fa-file',

        // ms office
        'doc' => 'fa-file-alt',
        'rtf' => 'fa-file-alt',
        'xls' => 'fa-file-excel',
        'ppt' => 'fa-file-powerpoint',
        'docx' => 'fa-file-word',
        'xlsx' => 'fa-file-excel',
        'pptx' => 'fa-file-powerpoint',


        // open office
        'odt' => 'fa-file-alt',
        'ods' => 'fa-file-alt',
    ];

    protected $with = ['user'];
    protected $appends = ['files_data'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function reply_with_only_image()
    {
        return $this->hasMany(TaskReply::class, 'comment_id', 'id');
    }

    public function getFilesDataAttribute()
    {
        if (!is_null($this->files)) {
            $files = [];
            if (is_string($this->files)) {
                $file_array = json_decode($this->files);
            }
            if (isset($file_array) && is_array($file_array)) {
                foreach ($file_array as $value) {
                    $ext = pathinfo($value, PATHINFO_EXTENSION); /* @phpstan-ignore-line */
                    $type= '';
                    if (in_array($ext, ['png', 'jpe', 'jpeg', 'jpg', 'gif', 'bmp', 'ico', 'tif', 'svg', 'svgz', 'psd', 'csv'])) {
                        $type = 'images';
                    }

                    if (!in_array($ext, array_keys($this->mimeType))) {
                        $type = 'doc';
                    }
                    array_push($files, [
                        'name' => $value,
                        'url' => \URL::asset(Storage::url($value)),
                        'icon' => $type
                    ]);
                }
            }
            return $this->files = $files;
        }
    }
}
