<?php
/*
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

namespace Google\Service\Batch;

<<<<<<< HEAD
class ServiceAccount extends \Google\Collection
{
  protected $collection_key = 'scopes';
=======
class ServiceAccount extends \Google\Model
{
>>>>>>> 1f8fa8284 (env)
  /**
   * @var string
   */
  public $email;
<<<<<<< HEAD
  /**
   * @var string[]
   */
  public $scopes;
=======
>>>>>>> 1f8fa8284 (env)

  /**
   * @param string
   */
  public function setEmail($email)
  {
    $this->email = $email;
  }
  /**
   * @return string
   */
  public function getEmail()
  {
    return $this->email;
  }
<<<<<<< HEAD
  /**
   * @param string[]
   */
  public function setScopes($scopes)
  {
    $this->scopes = $scopes;
  }
  /**
   * @return string[]
   */
  public function getScopes()
  {
    return $this->scopes;
  }
=======
>>>>>>> 1f8fa8284 (env)
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(ServiceAccount::class, 'Google_Service_Batch_ServiceAccount');
