export class User {
    constructor(data) {
      this.id = data?.id;
      this.name = data?.name;
      this.userName = data?.user_name || null;
      this.email = data?.email;
      this.adminApproval = data?.admin_approval;
      this.clientDetails = data?.client_details;
      this.countryId = data?.country_id;
      this.darkTheme = data?.dark_theme;
      this.emailNotifications = data?.email_notifications;
      this.employeeDetail = new Employee(data?.employee_detail);
      this.aboutMe = data?.about_me;
      this.addedBy = data?.added_by;
      this.address = data?.address;
      this.attendanceReminder = data?.attendance_reminder;
      this.calendarView = data?.calendar_view;
      this.dateOfBirth = new Date(data?.date_of_birth);
      this.departmentId = data?.department_id;
      this.employeeId = data?.employee_id;
      this.hourlyRate = data?.hourly_rate;
      this.joiningDate = new Date(data?.joining_date);
      this.lastDate = data?.last_date;
      this.reportingTo = data?.reporting_to;
      this.slackUsername = data?.slack_username;
      this.upcomingBirthday = new Date(data?.upcoming_birthday);
      this.userId = data?.id;
      this.gender = data?.gender;
      this.googleCalendarStatus = data?.google_calendar_status;
      this.image = data?.image;
      this.imageUrl = data?.image_url;
      this.lastLogin = new Date(data?.last_login);
      this.locale = data?.locale;
      this.login = data?.login;
      this.mobile = data?.mobile;
      this.modules = data?.modules;
      this.role = (data?.role?data?.role:[]).map(roleData => new UserRole(roleData));
      this.rtl = data?.rtl;
      this.roleId = Number(data?.role_id);
      this.salutation = data?.salutation;
      this.session = data?.session;
      this.status = data?.status;
      this.twoFaVerifyVia = data?.two_fa_verify_via;
      this.twoFactorCode = data?.two_factor_code;
      this.twoFactorConfirmed = data?.two_factor_confirmed;
      this.twoFactorEmailConfirmed = data?.two_factor_email_confirmed;
      this.twoFactorExpiresAt = data?.two_factor_expires_at;
      this.twoFactorRecoveryCodes = data?.two_factor_recovery_codes;
      this.twoFactorSecret = data?.two_factor_secret;
      this.userOtherRole = data?.user_other_role;
    }

    // name
    getName(){return this.name};

    // user id
    getId(){return Number(this.userId)};

    // user link
    getUserLink() {
      return `/account/employees/${this.userId}`;
    }

    // image URL
    getAvatar(){
      return this.imageUrl;
    } 

    // get role id
    getRoleId(){
      return this.roleId;
    }

    // designation name
    getDesignationName(){ 
      return this.employeeDetail.getEmployeeDesignationName();
    } 
  }
  
  class Employee {
    constructor(data) {
      this.id = data?.id;
      this.userId = data?.user_id;
      this.employeeId = data?.employee_id;
      this.address = data?.address;
      this.hourlyRate = data?.hourly_rate;
      this.lastUpdatedBy = data?.last_updated_by; 
      this.designation = new Designation(data?.designation);
    }

    //employe degenation name 
    getEmployeeDesignationName(){
      return this.designation.getDesignationName();
    }
    
  }
  
  class Designation {
    constructor(data) {
      this.id = data?.id;
      this.name = data?.name;
      this.parentId = data?.parent_id;
      this.addedBy = data?.added_by;
      this.lastUpdatedBy = data?.last_updated_by;
    }

    // gesination name
    getDesignationName(){
      return this.name
    }
  }
  
  class UserRole {
    constructor(data) {
      this.userId = data?.user_id;
      this.roleId = data?.role_id;
    }
  }