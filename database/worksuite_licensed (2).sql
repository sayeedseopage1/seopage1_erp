-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 23, 2022 at 10:16 AM
-- Server version: 5.7.33
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `worksuite_licensed`
--

-- --------------------------------------------------------

--
-- Table structure for table `accept_estimates`
--

CREATE TABLE `accept_estimates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `estimate_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location_id` bigint(20) UNSIGNED DEFAULT NULL,
  `clock_in_time` datetime NOT NULL,
  `clock_out_time` datetime DEFAULT NULL,
  `clock_in_ip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clock_out_ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `working_from` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'office',
  `work_from_type` enum('home','office','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `late` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `half_day` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `shift_start_time` datetime DEFAULT NULL,
  `shift_end_time` datetime DEFAULT NULL,
  `employee_shift_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance_settings`
--

CREATE TABLE `attendance_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `auto_clock_in` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `office_start_time` time NOT NULL,
  `office_end_time` time NOT NULL,
  `halfday_mark_time` time DEFAULT NULL,
  `late_mark_duration` tinyint(4) NOT NULL,
  `clockin_in_day` int(11) NOT NULL DEFAULT '1',
  `employee_clock_in_out` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `office_open_days` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[1,2,3,4,5]',
  `ip_address` text COLLATE utf8mb4_unicode_ci,
  `radius` int(11) DEFAULT NULL,
  `radius_check` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `ip_check` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `alert_after` int(11) DEFAULT NULL,
  `alert_after_status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `save_current_location` tinyint(1) NOT NULL DEFAULT '0',
  `default_employee_shift` bigint(20) UNSIGNED DEFAULT '1',
  `week_start_from` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `allow_shift_change` tinyint(1) NOT NULL DEFAULT '1',
  `show_clock_in_button` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendance_settings`
--

INSERT INTO `attendance_settings` (`id`, `auto_clock_in`, `office_start_time`, `office_end_time`, `halfday_mark_time`, `late_mark_duration`, `clockin_in_day`, `employee_clock_in_out`, `office_open_days`, `ip_address`, `radius`, `radius_check`, `ip_check`, `alert_after`, `alert_after_status`, `created_at`, `updated_at`, `save_current_location`, `default_employee_shift`, `week_start_from`, `allow_shift_change`, `show_clock_in_button`) VALUES
(1, 'no', '09:00:00', '18:00:00', NULL, 20, 1, 'yes', '[1,2,3,4,5]', NULL, NULL, 'no', 'no', NULL, 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 0, 1, '1', 1, 'no');

-- --------------------------------------------------------

--
-- Table structure for table `client_categories`
--

CREATE TABLE `client_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_contacts`
--

CREATE TABLE `client_contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `contact_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_details`
--

CREATE TABLE `client_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `shipping_address` text COLLATE utf8mb4_unicode_ci,
  `postal_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `office` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `linkedin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skype` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gst_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sub_category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_details`
--

INSERT INTO `client_details` (`id`, `user_id`, `company_name`, `address`, `shipping_address`, `postal_code`, `state`, `city`, `office`, `website`, `note`, `linkedin`, `facebook`, `twitter`, `skype`, `gst_number`, `created_at`, `updated_at`, `category_id`, `sub_category_id`, `added_by`, `last_updated_by`) VALUES
(1, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p><br></p>', NULL, NULL, NULL, NULL, NULL, '2022-09-19 22:53:06', '2022-09-19 22:53:06', NULL, NULL, 1, 1),
(2, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p><br></p>', NULL, NULL, NULL, NULL, NULL, '2022-09-19 23:51:56', '2022-09-19 23:51:56', NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client_docs`
--

CREATE TABLE `client_docs` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_notes`
--

CREATE TABLE `client_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int(10) UNSIGNED DEFAULT NULL,
  `is_client_show` tinyint(1) NOT NULL DEFAULT '0',
  `ask_password` tinyint(1) NOT NULL DEFAULT '0',
  `details` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_notes`
--

INSERT INTO `client_notes` (`id`, `client_id`, `title`, `type`, `member_id`, `is_client_show`, `ask_password`, `details`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 13, 'Note', 0, NULL, 0, 0, '<p><br></p>', 1, 1, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(2, 14, 'Note', 0, NULL, 0, 0, '<p><br></p>', 1, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56');

-- --------------------------------------------------------

--
-- Table structure for table `client_sub_categories`
--

CREATE TABLE `client_sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_user_notes`
--

CREATE TABLE `client_user_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `client_note_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_addresses`
--

CREATE TABLE `company_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `address` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `tax_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_addresses`
--

INSERT INTO `company_addresses` (`id`, `address`, `is_default`, `tax_number`, `tax_name`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Your Company address here', 1, NULL, NULL, 'Seopage1', '2022-09-19 00:15:04', '2022-09-19 00:19:52');

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_amount` decimal(15,2) NOT NULL,
  `contract_type_id` bigint(20) UNSIGNED DEFAULT NULL,
  `start_date` date NOT NULL,
  `original_start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `original_end_date` date DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `contract_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alternate_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cell` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `office` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contract_detail` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` text COLLATE utf8mb4_unicode_ci,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contracts`
--

INSERT INTO `contracts` (`id`, `client_id`, `subject`, `amount`, `original_amount`, `contract_type_id`, `start_date`, `original_start_date`, `end_date`, `original_end_date`, `description`, `contract_name`, `company_logo`, `alternate_address`, `cell`, `office`, `city`, `state`, `country`, `postal_code`, `contract_detail`, `created_at`, `updated_at`, `added_by`, `last_updated_by`, `hash`, `currency_id`, `event_id`) VALUES
(1, 13, 'sdasd', '500', '500.00', 1, '2022-09-21', '2022-09-21', '2022-09-21', '2022-09-21', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>dasdasd</p>', '2022-09-20 20:17:49', '2022-09-20 20:17:49', 1, 1, 'jv7nZwxDTnQuBbFJB5UTpH4ejf6rbLv9', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contract_custom_forms`
--

CREATE TABLE `contract_custom_forms` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_fields_id` int(10) UNSIGNED DEFAULT NULL,
  `field_display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_order` int(11) NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contract_discussions`
--

CREATE TABLE `contract_discussions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contract_id` bigint(20) UNSIGNED NOT NULL,
  `from` int(10) UNSIGNED NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contract_files`
--

CREATE TABLE `contract_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `contract_id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contract_renews`
--

CREATE TABLE `contract_renews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `renewed_by` int(10) UNSIGNED NOT NULL,
  `contract_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contract_signs`
--

CREATE TABLE `contract_signs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contract_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contract_templates`
--

CREATE TABLE `contract_templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contract_type_id` bigint(20) UNSIGNED NOT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `contract_detail` longtext COLLATE utf8mb4_unicode_ci,
  `added_by` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contract_types`
--

CREATE TABLE `contract_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contract_types`
--

INSERT INTO `contract_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Contractual', '2022-09-19 00:16:43', '2022-09-19 00:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_one` int(10) UNSIGNED NOT NULL,
  `user_two` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversation_reply`
--

CREATE TABLE `conversation_reply` (
  `id` int(10) UNSIGNED NOT NULL,
  `conversation_id` int(10) UNSIGNED NOT NULL,
  `reply` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `iso` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nicename` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iso3` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numcode` smallint(6) DEFAULT NULL,
  `phonecode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `iso`, `name`, `nicename`, `iso3`, `numcode`, `phonecode`) VALUES
(1, 'AF', 'AFGHANISTAN', 'Afghanistan', 'AFG', 4, 93),
(2, 'AL', 'ALBANIA', 'Albania', 'ALB', 8, 355),
(3, 'DZ', 'ALGERIA', 'Algeria', 'DZA', 12, 213),
(4, 'AS', 'AMERICAN SAMOA', 'American Samoa', 'ASM', 16, 1684),
(5, 'AD', 'ANDORRA', 'Andorra', 'AND', 20, 376),
(6, 'AO', 'ANGOLA', 'Angola', 'AGO', 24, 244),
(7, 'AI', 'ANGUILLA', 'Anguilla', 'AIA', 660, 1264),
(8, 'AQ', 'ANTARCTICA', 'Antarctica', NULL, NULL, 0),
(9, 'AG', 'ANTIGUA AND BARBUDA', 'Antigua and Barbuda', 'ATG', 28, 1268),
(10, 'AR', 'ARGENTINA', 'Argentina', 'ARG', 32, 54),
(11, 'AM', 'ARMENIA', 'Armenia', 'ARM', 51, 374),
(12, 'AW', 'ARUBA', 'Aruba', 'ABW', 533, 297),
(13, 'AU', 'AUSTRALIA', 'Australia', 'AUS', 36, 61),
(14, 'AT', 'AUSTRIA', 'Austria', 'AUT', 40, 43),
(15, 'AZ', 'AZERBAIJAN', 'Azerbaijan', 'AZE', 31, 994),
(16, 'BS', 'BAHAMAS', 'Bahamas', 'BHS', 44, 1242),
(17, 'BH', 'BAHRAIN', 'Bahrain', 'BHR', 48, 973),
(18, 'BD', 'BANGLADESH', 'Bangladesh', 'BGD', 50, 880),
(19, 'BB', 'BARBADOS', 'Barbados', 'BRB', 52, 1246),
(20, 'BY', 'BELARUS', 'Belarus', 'BLR', 112, 375),
(21, 'BE', 'BELGIUM', 'Belgium', 'BEL', 56, 32),
(22, 'BZ', 'BELIZE', 'Belize', 'BLZ', 84, 501),
(23, 'BJ', 'BENIN', 'Benin', 'BEN', 204, 229),
(24, 'BM', 'BERMUDA', 'Bermuda', 'BMU', 60, 1441),
(25, 'BT', 'BHUTAN', 'Bhutan', 'BTN', 64, 975),
(26, 'BO', 'BOLIVIA', 'Bolivia', 'BOL', 68, 591),
(27, 'BA', 'BOSNIA AND HERZEGOVINA', 'Bosnia and Herzegovina', 'BIH', 70, 387),
(28, 'BW', 'BOTSWANA', 'Botswana', 'BWA', 72, 267),
(29, 'BV', 'BOUVET ISLAND', 'Bouvet Island', NULL, NULL, 0),
(30, 'BR', 'BRAZIL', 'Brazil', 'BRA', 76, 55),
(31, 'IO', 'BRITISH INDIAN OCEAN TERRITORY', 'British Indian Ocean Territory', NULL, NULL, 246),
(32, 'BN', 'BRUNEI DARUSSALAM', 'Brunei Darussalam', 'BRN', 96, 673),
(33, 'BG', 'BULGARIA', 'Bulgaria', 'BGR', 100, 359),
(34, 'BF', 'BURKINA FASO', 'Burkina Faso', 'BFA', 854, 226),
(35, 'BI', 'BURUNDI', 'Burundi', 'BDI', 108, 257),
(36, 'KH', 'CAMBODIA', 'Cambodia', 'KHM', 116, 855),
(37, 'CM', 'CAMEROON', 'Cameroon', 'CMR', 120, 237),
(38, 'CA', 'CANADA', 'Canada', 'CAN', 124, 1),
(39, 'CV', 'CAPE VERDE', 'Cape Verde', 'CPV', 132, 238),
(40, 'KY', 'CAYMAN ISLANDS', 'Cayman Islands', 'CYM', 136, 1345),
(41, 'CF', 'CENTRAL AFRICAN REPUBLIC', 'Central African Republic', 'CAF', 140, 236),
(42, 'TD', 'CHAD', 'Chad', 'TCD', 148, 235),
(43, 'CL', 'CHILE', 'Chile', 'CHL', 152, 56),
(44, 'CN', 'CHINA', 'China', 'CHN', 156, 86),
(45, 'CX', 'CHRISTMAS ISLAND', 'Christmas Island', NULL, NULL, 61),
(46, 'CC', 'COCOS (KEELING) ISLANDS', 'Cocos (Keeling) Islands', NULL, NULL, 672),
(47, 'CO', 'COLOMBIA', 'Colombia', 'COL', 170, 57),
(48, 'KM', 'COMOROS', 'Comoros', 'COM', 174, 269),
(49, 'CG', 'CONGO', 'Congo', 'COG', 178, 242),
(50, 'CD', 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'Congo, the Democratic Republic of the', 'COD', 180, 242),
(51, 'CK', 'COOK ISLANDS', 'Cook Islands', 'COK', 184, 682),
(52, 'CR', 'COSTA RICA', 'Costa Rica', 'CRI', 188, 506),
(53, 'CI', 'COTE D\'IVOIRE', 'Cote D\'Ivoire', 'CIV', 384, 225),
(54, 'HR', 'CROATIA', 'Croatia', 'HRV', 191, 385),
(55, 'CU', 'CUBA', 'Cuba', 'CUB', 192, 53),
(56, 'CY', 'CYPRUS', 'Cyprus', 'CYP', 196, 357),
(57, 'CZ', 'CZECH REPUBLIC', 'Czech Republic', 'CZE', 203, 420),
(58, 'DK', 'DENMARK', 'Denmark', 'DNK', 208, 45),
(59, 'DJ', 'DJIBOUTI', 'Djibouti', 'DJI', 262, 253),
(60, 'DM', 'DOMINICA', 'Dominica', 'DMA', 212, 1767),
(61, 'DO', 'DOMINICAN REPUBLIC', 'Dominican Republic', 'DOM', 214, 1809),
(62, 'EC', 'ECUADOR', 'Ecuador', 'ECU', 218, 593),
(63, 'EG', 'EGYPT', 'Egypt', 'EGY', 818, 20),
(64, 'SV', 'EL SALVADOR', 'El Salvador', 'SLV', 222, 503),
(65, 'GQ', 'EQUATORIAL GUINEA', 'Equatorial Guinea', 'GNQ', 226, 240),
(66, 'ER', 'ERITREA', 'Eritrea', 'ERI', 232, 291),
(67, 'EE', 'ESTONIA', 'Estonia', 'EST', 233, 372),
(68, 'ET', 'ETHIOPIA', 'Ethiopia', 'ETH', 231, 251),
(69, 'FK', 'FALKLAND ISLANDS (MALVINAS)', 'Falkland Islands (Malvinas)', 'FLK', 238, 500),
(70, 'FO', 'FAROE ISLANDS', 'Faroe Islands', 'FRO', 234, 298),
(71, 'FJ', 'FIJI', 'Fiji', 'FJI', 242, 679),
(72, 'FI', 'FINLAND', 'Finland', 'FIN', 246, 358),
(73, 'FR', 'FRANCE', 'France', 'FRA', 250, 33),
(74, 'GF', 'FRENCH GUIANA', 'French Guiana', 'GUF', 254, 594),
(75, 'PF', 'FRENCH POLYNESIA', 'French Polynesia', 'PYF', 258, 689),
(76, 'TF', 'FRENCH SOUTHERN TERRITORIES', 'French Southern Territories', NULL, NULL, 0),
(77, 'GA', 'GABON', 'Gabon', 'GAB', 266, 241),
(78, 'GM', 'GAMBIA', 'Gambia', 'GMB', 270, 220),
(79, 'GE', 'GEORGIA', 'Georgia', 'GEO', 268, 995),
(80, 'DE', 'GERMANY', 'Germany', 'DEU', 276, 49),
(81, 'GH', 'GHANA', 'Ghana', 'GHA', 288, 233),
(82, 'GI', 'GIBRALTAR', 'Gibraltar', 'GIB', 292, 350),
(83, 'GR', 'GREECE', 'Greece', 'GRC', 300, 30),
(84, 'GL', 'GREENLAND', 'Greenland', 'GRL', 304, 299),
(85, 'GD', 'GRENADA', 'Grenada', 'GRD', 308, 1473),
(86, 'GP', 'GUADELOUPE', 'Guadeloupe', 'GLP', 312, 590),
(87, 'GU', 'GUAM', 'Guam', 'GUM', 316, 1671),
(88, 'GT', 'GUATEMALA', 'Guatemala', 'GTM', 320, 502),
(89, 'GN', 'GUINEA', 'Guinea', 'GIN', 324, 224),
(90, 'GW', 'GUINEA-BISSAU', 'Guinea-Bissau', 'GNB', 624, 245),
(91, 'GY', 'GUYANA', 'Guyana', 'GUY', 328, 592),
(92, 'HT', 'HAITI', 'Haiti', 'HTI', 332, 509),
(93, 'HM', 'HEARD ISLAND AND MCDONALD ISLANDS', 'Heard Island and Mcdonald Islands', NULL, NULL, 0),
(94, 'VA', 'HOLY SEE (VATICAN CITY STATE)', 'Holy See (Vatican City State)', 'VAT', 336, 39),
(95, 'HN', 'HONDURAS', 'Honduras', 'HND', 340, 504),
(96, 'HK', 'HONG KONG', 'Hong Kong', 'HKG', 344, 852),
(97, 'HU', 'HUNGARY', 'Hungary', 'HUN', 348, 36),
(98, 'IS', 'ICELAND', 'Iceland', 'ISL', 352, 354),
(99, 'IN', 'INDIA', 'India', 'IND', 356, 91),
(100, 'ID', 'INDONESIA', 'Indonesia', 'IDN', 360, 62),
(101, 'IR', 'IRAN, ISLAMIC REPUBLIC OF', 'Iran, Islamic Republic of', 'IRN', 364, 98),
(102, 'IQ', 'IRAQ', 'Iraq', 'IRQ', 368, 964),
(103, 'IE', 'IRELAND', 'Ireland', 'IRL', 372, 353),
(104, 'IL', 'ISRAEL', 'Israel', 'ISR', 376, 972),
(105, 'IT', 'ITALY', 'Italy', 'ITA', 380, 39),
(106, 'JM', 'JAMAICA', 'Jamaica', 'JAM', 388, 1876),
(107, 'JP', 'JAPAN', 'Japan', 'JPN', 392, 81),
(108, 'JO', 'JORDAN', 'Jordan', 'JOR', 400, 962),
(109, 'KZ', 'KAZAKHSTAN', 'Kazakhstan', 'KAZ', 398, 7),
(110, 'KE', 'KENYA', 'Kenya', 'KEN', 404, 254),
(111, 'KI', 'KIRIBATI', 'Kiribati', 'KIR', 296, 686),
(112, 'KP', 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF', 'Korea, Democratic People\'s Republic of', 'PRK', 408, 850),
(113, 'KR', 'KOREA, REPUBLIC OF', 'Korea, Republic of', 'KOR', 410, 82),
(114, 'KW', 'KUWAIT', 'Kuwait', 'KWT', 414, 965),
(115, 'KG', 'KYRGYZSTAN', 'Kyrgyzstan', 'KGZ', 417, 996),
(116, 'LA', 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC', 'Lao People\'s Democratic Republic', 'LAO', 418, 856),
(117, 'LV', 'LATVIA', 'Latvia', 'LVA', 428, 371),
(118, 'LB', 'LEBANON', 'Lebanon', 'LBN', 422, 961),
(119, 'LS', 'LESOTHO', 'Lesotho', 'LSO', 426, 266),
(120, 'LR', 'LIBERIA', 'Liberia', 'LBR', 430, 231),
(121, 'LY', 'LIBYAN ARAB JAMAHIRIYA', 'Libyan Arab Jamahiriya', 'LBY', 434, 218),
(122, 'LI', 'LIECHTENSTEIN', 'Liechtenstein', 'LIE', 438, 423),
(123, 'LT', 'LITHUANIA', 'Lithuania', 'LTU', 440, 370),
(124, 'LU', 'LUXEMBOURG', 'Luxembourg', 'LUX', 442, 352),
(125, 'MO', 'MACAO', 'Macao', 'MAC', 446, 853),
(126, 'MK', 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', 'Macedonia, the Former Yugoslav Republic of', 'MKD', 807, 389),
(127, 'MG', 'MADAGASCAR', 'Madagascar', 'MDG', 450, 261),
(128, 'MW', 'MALAWI', 'Malawi', 'MWI', 454, 265),
(129, 'MY', 'MALAYSIA', 'Malaysia', 'MYS', 458, 60),
(130, 'MV', 'MALDIVES', 'Maldives', 'MDV', 462, 960),
(131, 'ML', 'MALI', 'Mali', 'MLI', 466, 223),
(132, 'MT', 'MALTA', 'Malta', 'MLT', 470, 356),
(133, 'MH', 'MARSHALL ISLANDS', 'Marshall Islands', 'MHL', 584, 692),
(134, 'MQ', 'MARTINIQUE', 'Martinique', 'MTQ', 474, 596),
(135, 'MR', 'MAURITANIA', 'Mauritania', 'MRT', 478, 222),
(136, 'MU', 'MAURITIUS', 'Mauritius', 'MUS', 480, 230),
(137, 'YT', 'MAYOTTE', 'Mayotte', NULL, NULL, 269),
(138, 'MX', 'MEXICO', 'Mexico', 'MEX', 484, 52),
(139, 'FM', 'MICRONESIA, FEDERATED STATES OF', 'Micronesia, Federated States of', 'FSM', 583, 691),
(140, 'MD', 'MOLDOVA, REPUBLIC OF', 'Moldova, Republic of', 'MDA', 498, 373),
(141, 'MC', 'MONACO', 'Monaco', 'MCO', 492, 377),
(142, 'MN', 'MONGOLIA', 'Mongolia', 'MNG', 496, 976),
(143, 'MS', 'MONTSERRAT', 'Montserrat', 'MSR', 500, 1664),
(144, 'MA', 'MOROCCO', 'Morocco', 'MAR', 504, 212),
(145, 'MZ', 'MOZAMBIQUE', 'Mozambique', 'MOZ', 508, 258),
(146, 'MM', 'MYANMAR', 'Myanmar', 'MMR', 104, 95),
(147, 'NA', 'NAMIBIA', 'Namibia', 'NAM', 516, 264),
(148, 'NR', 'NAURU', 'Nauru', 'NRU', 520, 674),
(149, 'NP', 'NEPAL', 'Nepal', 'NPL', 524, 977),
(150, 'NL', 'NETHERLANDS', 'Netherlands', 'NLD', 528, 31),
(151, 'AN', 'NETHERLANDS ANTILLES', 'Netherlands Antilles', 'ANT', 530, 599),
(152, 'NC', 'NEW CALEDONIA', 'New Caledonia', 'NCL', 540, 687),
(153, 'NZ', 'NEW ZEALAND', 'New Zealand', 'NZL', 554, 64),
(154, 'NI', 'NICARAGUA', 'Nicaragua', 'NIC', 558, 505),
(155, 'NE', 'NIGER', 'Niger', 'NER', 562, 227),
(156, 'NG', 'NIGERIA', 'Nigeria', 'NGA', 566, 234),
(157, 'NU', 'NIUE', 'Niue', 'NIU', 570, 683),
(158, 'NF', 'NORFOLK ISLAND', 'Norfolk Island', 'NFK', 574, 672),
(159, 'MP', 'NORTHERN MARIANA ISLANDS', 'Northern Mariana Islands', 'MNP', 580, 1670),
(160, 'NO', 'NORWAY', 'Norway', 'NOR', 578, 47),
(161, 'OM', 'OMAN', 'Oman', 'OMN', 512, 968),
(162, 'PK', 'PAKISTAN', 'Pakistan', 'PAK', 586, 92),
(163, 'PW', 'PALAU', 'Palau', 'PLW', 585, 680),
(164, 'PS', 'PALESTINIAN TERRITORY, OCCUPIED', 'Palestinian Territory, Occupied', NULL, NULL, 970),
(165, 'PA', 'PANAMA', 'Panama', 'PAN', 591, 507),
(166, 'PG', 'PAPUA NEW GUINEA', 'Papua New Guinea', 'PNG', 598, 675),
(167, 'PY', 'PARAGUAY', 'Paraguay', 'PRY', 600, 595),
(168, 'PE', 'PERU', 'Peru', 'PER', 604, 51),
(169, 'PH', 'PHILIPPINES', 'Philippines', 'PHL', 608, 63),
(170, 'PN', 'PITCAIRN', 'Pitcairn', 'PCN', 612, 0),
(171, 'PL', 'POLAND', 'Poland', 'POL', 616, 48),
(172, 'PT', 'PORTUGAL', 'Portugal', 'PRT', 620, 351),
(173, 'PR', 'PUERTO RICO', 'Puerto Rico', 'PRI', 630, 1787),
(174, 'QA', 'QATAR', 'Qatar', 'QAT', 634, 974),
(175, 'RE', 'REUNION', 'Reunion', 'REU', 638, 262),
(176, 'RO', 'ROMANIA', 'Romania', 'ROM', 642, 40),
(177, 'RU', 'RUSSIAN FEDERATION', 'Russian Federation', 'RUS', 643, 70),
(178, 'RW', 'RWANDA', 'Rwanda', 'RWA', 646, 250),
(179, 'SH', 'SAINT HELENA', 'Saint Helena', 'SHN', 654, 290),
(180, 'KN', 'SAINT KITTS AND NEVIS', 'Saint Kitts and Nevis', 'KNA', 659, 1869),
(181, 'LC', 'SAINT LUCIA', 'Saint Lucia', 'LCA', 662, 1758),
(182, 'PM', 'SAINT PIERRE AND MIQUELON', 'Saint Pierre and Miquelon', 'SPM', 666, 508),
(183, 'VC', 'SAINT VINCENT AND THE GRENADINES', 'Saint Vincent and the Grenadines', 'VCT', 670, 1784),
(184, 'WS', 'SAMOA', 'Samoa', 'WSM', 882, 684),
(185, 'SM', 'SAN MARINO', 'San Marino', 'SMR', 674, 378),
(186, 'ST', 'SAO TOME AND PRINCIPE', 'Sao Tome and Principe', 'STP', 678, 239),
(187, 'SA', 'SAUDI ARABIA', 'Saudi Arabia', 'SAU', 682, 966),
(188, 'SN', 'SENEGAL', 'Senegal', 'SEN', 686, 221),
(189, 'CS', 'SERBIA AND MONTENEGRO', 'Serbia and Montenegro', NULL, NULL, 381),
(190, 'SC', 'SEYCHELLES', 'Seychelles', 'SYC', 690, 248),
(191, 'SL', 'SIERRA LEONE', 'Sierra Leone', 'SLE', 694, 232),
(192, 'SG', 'SINGAPORE', 'Singapore', 'SGP', 702, 65),
(193, 'SK', 'SLOVAKIA', 'Slovakia', 'SVK', 703, 421),
(194, 'SI', 'SLOVENIA', 'Slovenia', 'SVN', 705, 386),
(195, 'SB', 'SOLOMON ISLANDS', 'Solomon Islands', 'SLB', 90, 677),
(196, 'SO', 'SOMALIA', 'Somalia', 'SOM', 706, 252),
(197, 'ZA', 'SOUTH AFRICA', 'South Africa', 'ZAF', 710, 27),
(198, 'GS', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'South Georgia and the South Sandwich Islands', NULL, NULL, 0),
(199, 'ES', 'SPAIN', 'Spain', 'ESP', 724, 34),
(200, 'LK', 'SRI LANKA', 'Sri Lanka', 'LKA', 144, 94),
(201, 'SD', 'SUDAN', 'Sudan', 'SDN', 736, 249),
(202, 'SR', 'SURINAME', 'Suriname', 'SUR', 740, 597),
(203, 'SJ', 'SVALBARD AND JAN MAYEN', 'Svalbard and Jan Mayen', 'SJM', 744, 47),
(204, 'SZ', 'SWAZILAND', 'Swaziland', 'SWZ', 748, 268),
(205, 'SE', 'SWEDEN', 'Sweden', 'SWE', 752, 46),
(206, 'CH', 'SWITZERLAND', 'Switzerland', 'CHE', 756, 41),
(207, 'SY', 'SYRIAN ARAB REPUBLIC', 'Syrian Arab Republic', 'SYR', 760, 963),
(208, 'TW', 'TAIWAN, PROVINCE OF CHINA', 'Taiwan, Province of China', 'TWN', 158, 886),
(209, 'TJ', 'TAJIKISTAN', 'Tajikistan', 'TJK', 762, 992),
(210, 'TZ', 'TANZANIA, UNITED REPUBLIC OF', 'Tanzania, United Republic of', 'TZA', 834, 255),
(211, 'TH', 'THAILAND', 'Thailand', 'THA', 764, 66),
(212, 'TL', 'TIMOR-LESTE', 'Timor-Leste', NULL, NULL, 670),
(213, 'TG', 'TOGO', 'Togo', 'TGO', 768, 228),
(214, 'TK', 'TOKELAU', 'Tokelau', 'TKL', 772, 690),
(215, 'TO', 'TONGA', 'Tonga', 'TON', 776, 676),
(216, 'TT', 'TRINIDAD AND TOBAGO', 'Trinidad and Tobago', 'TTO', 780, 1868),
(217, 'TN', 'TUNISIA', 'Tunisia', 'TUN', 788, 216),
(218, 'TR', 'TURKEY', 'Turkey', 'TUR', 792, 90),
(219, 'TM', 'TURKMENISTAN', 'Turkmenistan', 'TKM', 795, 7370),
(220, 'TC', 'TURKS AND CAICOS ISLANDS', 'Turks and Caicos Islands', 'TCA', 796, 1649),
(221, 'TV', 'TUVALU', 'Tuvalu', 'TUV', 798, 688),
(222, 'UG', 'UGANDA', 'Uganda', 'UGA', 800, 256),
(223, 'UA', 'UKRAINE', 'Ukraine', 'UKR', 804, 380),
(224, 'AE', 'UNITED ARAB EMIRATES', 'United Arab Emirates', 'ARE', 784, 971),
(225, 'GB', 'UNITED KINGDOM', 'United Kingdom', 'GBR', 826, 44),
(226, 'US', 'UNITED STATES', 'United States', 'USA', 840, 1),
(227, 'UM', 'UNITED STATES MINOR OUTLYING ISLANDS', 'United States Minor Outlying Islands', NULL, NULL, 1),
(228, 'UY', 'URUGUAY', 'Uruguay', 'URY', 858, 598),
(229, 'UZ', 'UZBEKISTAN', 'Uzbekistan', 'UZB', 860, 998),
(230, 'VU', 'VANUATU', 'Vanuatu', 'VUT', 548, 678),
(231, 'VE', 'VENEZUELA', 'Venezuela', 'VEN', 862, 58),
(232, 'VN', 'VIET NAM', 'Viet Nam', 'VNM', 704, 84),
(233, 'VG', 'VIRGIN ISLANDS, BRITISH', 'Virgin Islands, British', 'VGB', 92, 1284),
(234, 'VI', 'VIRGIN ISLANDS, U.S.', 'Virgin Islands, U.s.', 'VIR', 850, 1340),
(235, 'WF', 'WALLIS AND FUTUNA', 'Wallis and Futuna', 'WLF', 876, 681),
(236, 'EH', 'WESTERN SAHARA', 'Western Sahara', 'ESH', 732, 212),
(237, 'YE', 'YEMEN', 'Yemen', 'YEM', 887, 967),
(238, 'ZM', 'ZAMBIA', 'Zambia', 'ZMB', 894, 260),
(239, 'ZW', 'ZIMBABWE', 'Zimbabwe', 'ZWE', 716, 263),
(240, 'RS', 'SERBIA', 'Serbia', 'SRB', 688, 381),
(241, 'AP', 'ASIA PACIFIC REGION', 'Asia / Pacific Region', '0', 0, 0),
(242, 'ME', 'MONTENEGRO', 'Montenegro', 'MNE', 499, 382),
(243, 'AX', 'ALAND ISLANDS', 'Aland Islands', 'ALA', 248, 358),
(244, 'BQ', 'BONAIRE, SINT EUSTATIUS AND SABA', 'Bonaire, Sint Eustatius and Saba', 'BES', 535, 599),
(245, 'CW', 'CURACAO', 'Curacao', 'CUW', 531, 599),
(246, 'GG', 'GUERNSEY', 'Guernsey', 'GGY', 831, 44),
(247, 'IM', 'ISLE OF MAN', 'Isle of Man', 'IMN', 833, 44),
(248, 'JE', 'JERSEY', 'Jersey', 'JEY', 832, 44),
(249, 'XK', 'KOSOVO', 'Kosovo', '---', 0, 381),
(250, 'BL', 'SAINT BARTHELEMY', 'Saint Barthelemy', 'BLM', 652, 590),
(251, 'MF', 'SAINT MARTIN', 'Saint Martin', 'MAF', 663, 590),
(252, 'SX', 'SINT MAARTEN', 'Sint Maarten', 'SXM', 534, 1),
(253, 'SS', 'SOUTH SUDAN', 'South Sudan', 'SSD', 728, 211);

-- --------------------------------------------------------

--
-- Table structure for table `credit_notes`
--

CREATE TABLE `credit_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `cn_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `sub_total` double(15,2) NOT NULL,
  `total` double(15,2) NOT NULL,
  `adjustment_amount` double(8,2) DEFAULT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('closed','open') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `recurring` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `billing_frequency` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_interval` int(11) DEFAULT NULL,
  `billing_cycle` int(11) DEFAULT NULL,
  `file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_original_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `calculate_tax` enum('after_discount','before_discount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'after_discount'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `credit_note_items`
--

CREATE TABLE `credit_note_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `credit_note_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `quantity` int(11) NOT NULL,
  `unit_price` double(8,2) NOT NULL,
  `amount` double(8,2) NOT NULL,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_summary` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `credit_note_item_images`
--

CREATE TABLE `credit_note_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `credit_note_item_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` int(10) UNSIGNED NOT NULL,
  `currency_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exchange_rate` double DEFAULT NULL,
  `is_cryptocurrency` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `usd_price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `currency_name`, `currency_symbol`, `currency_code`, `exchange_rate`, `is_cryptocurrency`, `usd_price`, `created_at`, `updated_at`) VALUES
(1, 'Dollars', '$', 'USD', NULL, 'no', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(2, 'Pounds', '£', 'GBP', NULL, 'no', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(3, 'Euros', '€', 'EUR', NULL, 'no', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(4, 'Rupee', '₹', 'INR', NULL, 'no', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `currency_format_settings`
--

CREATE TABLE `currency_format_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `currency_position` enum('left','right','left_with_space','right_with_space') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'left',
  `no_of_decimal` int(10) UNSIGNED NOT NULL,
  `thousand_separator` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `decimal_separator` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currency_format_settings`
--

INSERT INTO `currency_format_settings` (`id`, `currency_position`, `no_of_decimal`, `thousand_separator`, `decimal_separator`) VALUES
(1, 'left', 2, ',', '.');

-- --------------------------------------------------------

--
-- Table structure for table `custom_fields`
--

CREATE TABLE `custom_fields` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_field_group_id` int(10) UNSIGNED DEFAULT NULL,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `required` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `values` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `export` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_fields`
--

INSERT INTO `custom_fields` (`id`, `custom_field_group_id`, `label`, `name`, `type`, `required`, `values`, `export`) VALUES
(3, 9, 'Test Field', 'test-field', 'text', 'yes', '[null]', 1),
(8, 2, 'Test Client', 'test-client', 'text', 'yes', '[null]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `custom_fields_data`
--

CREATE TABLE `custom_fields_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_field_id` int(10) UNSIGNED NOT NULL,
  `model_id` int(10) UNSIGNED NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_fields_data`
--

INSERT INTO `custom_fields_data` (`id`, `custom_field_id`, `model_id`, `model`, `value`) VALUES
(1, 8, 2, 'App\\Models\\ClientDetails', 'Test Custom Field'),
(2, 3, 1, 'App\\Models\\Lead', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `custom_field_groups`
--

CREATE TABLE `custom_field_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_field_groups`
--

INSERT INTO `custom_field_groups` (`id`, `name`, `model`) VALUES
(1, 'Time Log', 'App\\Models\\ProjectTimeLog'),
(2, 'Client', 'App\\Models\\ClientDetails'),
(3, 'Employee', 'App\\Models\\EmployeeDetails'),
(4, 'Project', 'App\\Models\\Project'),
(5, 'Invoice', 'App\\Models\\Invoice'),
(6, 'Estimate', 'App\\Models\\Estimate'),
(7, 'Task', 'App\\Models\\Task'),
(8, 'Expense', 'App\\Models\\Expense'),
(9, 'Lead', 'App\\Models\\Lead'),
(10, 'Product', 'App\\Models\\Product'),
(11, 'Ticket', 'App\\Models\\Ticket'),
(12, 'Contract', 'App\\Models\\ContractCustomForm');

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_widgets`
--

CREATE TABLE `dashboard_widgets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `widget_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `dashboard_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dashboard_widgets`
--

INSERT INTO `dashboard_widgets` (`id`, `widget_name`, `status`, `created_at`, `updated_at`, `dashboard_type`) VALUES
(1, 'leave', 1, '2022-09-19 00:14:41', '2022-09-19 00:14:41', 'private-dashboard'),
(2, 'lead', 1, '2022-09-19 00:14:42', '2022-09-19 00:14:42', 'private-dashboard'),
(3, 'work_from_home', 1, '2022-09-19 00:14:43', '2022-09-19 00:14:43', 'private-dashboard'),
(4, 'total_clients', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(5, 'total_employees', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(6, 'total_projects', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(7, 'total_unpaid_invoices', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(8, 'total_hours_logged', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(9, 'total_pending_tasks', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(10, 'total_today_attendance', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(11, 'total_unresolved_tickets', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(12, 'recent_earnings', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(13, 'settings_leaves', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(14, 'new_tickets', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(15, 'overdue_tasks', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(16, 'pending_follow_up', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(17, 'project_activity_timeline', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(18, 'user_activity_timeline', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(19, 'total_clients', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(20, 'total_leads', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(21, 'total_lead_conversions', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(22, 'total_contracts_generated', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(23, 'total_contracts_signed', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(24, 'client_wise_earnings', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(25, 'client_wise_timelogs', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(26, 'lead_vs_status', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(27, 'lead_vs_source', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(28, 'latest_client', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(29, 'recent_login_activities', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-client-dashboard'),
(30, 'total_paid_invoices', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(31, 'total_expenses', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(32, 'total_earnings', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(33, 'total_pending_amount', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(34, 'invoice_overview', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(35, 'estimate_overview', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(36, 'proposal_overview', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(37, 'earnings_by_client', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(38, 'earnings_by_projects', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(39, 'total_leaves_approved', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(40, 'total_new_employee', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(41, 'total_employee_exits', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(42, 'average_attendance', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(43, 'department_wise_employee', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(44, 'designation_wise_employee', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(45, 'gender_wise_employee', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(46, 'role_wise_employee', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(47, 'leaves_taken', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(48, 'late_attendance_mark', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(49, 'total_project', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-project-dashboard'),
(50, 'total_hours_logged', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-project-dashboard'),
(51, 'total_overdue_project', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-project-dashboard'),
(52, 'status_wise_project', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-project-dashboard'),
(53, 'pending_milestone', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-project-dashboard'),
(54, 'total_tickets', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-ticket-dashboard'),
(55, 'total_unassigned_ticket', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-ticket-dashboard'),
(56, 'type_wise_ticket', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-ticket-dashboard'),
(57, 'status_wise_ticket', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-ticket-dashboard'),
(58, 'channel_wise_ticket', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-ticket-dashboard'),
(59, 'new_tickets', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-ticket-dashboard'),
(60, 'timelogs', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-dashboard'),
(61, 'total_unpaid_invoices', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-finance-dashboard'),
(62, 'birthday', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(63, 'profile', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(64, 'shift_schedule', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(65, 'birthday', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(66, 'notices', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(67, 'tasks', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(68, 'projects', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(69, 'my_task', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(70, 'my_calender', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(71, 'week_timelog', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(72, 'total_today_attendance', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'admin-hr-dashboard'),
(73, 'leave', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(74, 'lead', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard'),
(75, 'work_from_home', 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06', 'private-dashboard');

-- --------------------------------------------------------

--
-- Table structure for table `database_backups`
--

CREATE TABLE `database_backups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `database_backup_cron_settings`
--

CREATE TABLE `database_backup_cron_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `hour_of_day` time DEFAULT NULL,
  `backup_after_days` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete_backup_after_days` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `database_backup_cron_settings`
--

INSERT INTO `database_backup_cron_settings` (`id`, `status`, `hour_of_day`, `backup_after_days`, `delete_backup_after_days`) VALUES
(1, 'inactive', '00:00:00', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `deals`
--

CREATE TABLE `deals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `deal_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organization` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pipeline_stage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deal_creation_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deals`
--

INSERT INTO `deals` (`id`, `deal_id`, `client_name`, `organization`, `project_name`, `pipeline_stage`, `start_date`, `amount`, `deal_creation_date`, `message_link`, `profile_link`, `currency_id`, `description`, `created_at`, `updated_at`) VALUES
(64, 'DSEOP1NF8GA8', 'jhsadjasdkasjnd', 'kjsdjsadkas das', 'bjdsjkadbsabdasb', 'Contact Made', '2022-09-23', '300', '2022-09-23 06:16:57', 'sdnsadnasdnadnlak', 'dasdasdas', 1, '<p>sbdjsabdasbdasbdasb</p>', '2022-09-23 00:16:57', '2022-09-23 00:16:57'),
(65, 'DSEOP1LXZPKE', 'jhsadjasdkasjnd', 'kjsdjsadkas das', 'bjdsjkadbsabdasb', 'Contact Made', '2022-09-23', '300', '2022-09-23 06:19:24', 'sdnsadnasdnadnlak', 'dasdasdas', 1, '<p>sbdjsabdasbdasbdasb</p>', '2022-09-23 00:19:24', '2022-09-23 00:19:24'),
(66, 'DSEOP1DEF9Y6', 'jhsadjasdkasjnd', 'kjsdjsadkas das', 'bjdsjkadbsabdasb', 'Contact Made', '2022-09-23', '300', '2022-09-23 06:19:50', 'sdnsadnasdnadnlak', 'dasdasdas', 1, '<p>sbdjsabdasbdasbdasb</p>', '2022-09-23 00:19:50', '2022-09-23 00:19:50'),
(67, 'DSEOP1WCOQS4', 'daskdnkjasn dasnd', 'kndlkasndlkasnnd', 'dnklasndlasnd', 'Contact Made', '2022-09-23', '400', '2022-09-23 06:32:04', 'hjdbsjdjasdjhasb', 'sadsadasd', 1, '<p>sbajdbasjbd</p>', '2022-09-23 00:32:04', '2022-09-23 00:32:04'),
(68, 'DSEOP1LS8XJH', 'sdjkasdkjasbdkja', 'bdasbdkaskdbs', 'bjdsakjdsadb', 'Contact Made', '2022-09-23', '500', '2022-09-23 06:32:35', 'dksamdklsamdklasmdas', 'jsndsadasnlkdnask', 1, '<p>jncsnlkcnsalkcnlkasnlkasnl</p>', '2022-09-23 00:32:35', '2022-09-23 00:32:35'),
(69, 'DSEOP1ANDAI2', 'jsbksacxsakjcbkjasb', 'bdjkasndksanlkdas', 'dnsakldnlasdnlaks', 'Contact Made', '2022-09-23', '550', '2022-09-23 06:33:40', 'opsadaspodpoas', 'snkladnklsandsandlaskkln', 1, '<p>dlkasndasndaslkdnlask</p>', '2022-09-23 00:33:40', '2022-09-23 00:33:40'),
(70, 'DSEOP1R0V07E', 'lkznxlkZNxl', 'dlkjasndlkasnd', 'ndlksadlnasld', 'Contact Made', '2022-09-23', '100', '2022-09-23 06:34:43', 'jdsandasnd', 'sbdjasndkjsa', 1, '<p>cnklsankldfndfnlasn</p>', '2022-09-23 00:34:43', '2022-09-23 00:34:43'),
(71, 'DSEOP13KOFDD', 'sadsajkdnaskln', 'ndnsadnasdnk', 'ndsandlkasndlkas', 'Contact Made', '2022-09-23', '300', '2022-09-23 06:37:25', 'hdsahdashdaos', 'jsdasndasndlkasn', 1, '<p>nnlkdsandasnd</p>', '2022-09-23 00:37:25', '2022-09-23 00:37:25'),
(72, 'DSEOP1V4W3ZN', 'bxkjsabxkasb', 'sadsahodihaso', 'sdjsabdsakjbdas', 'Contact Made', '2022-09-23', '1000', '2022-09-23 06:38:23', 'sdjlsandasdaslk', 'jsdjasdnlkasnd', 1, '<p>jnskdnsaldnkaslndklas</p>', '2022-09-23 00:38:23', '2022-09-23 00:38:23'),
(73, 'DSEOP124AEED', 'dklasdnasnd', 'jdnjsandlkasn', 'dbjkasdasdn', 'Contact Made', '2022-09-23', '350', '2022-09-23 06:38:52', 'kldnklasdnlkasndkl', 'nisdjdad;las', 1, '<p>jisdbjkasbdjasb</p>', '2022-09-23 00:38:52', '2022-09-23 00:38:52'),
(74, 'DSEOP18ISOK0', 'dkjasdnsanda', 'dsamdlasmdlk;mas', 'jkbdaskjbdkas', 'Qualified', '2022-09-23', '450', '2022-09-23 06:39:46', 'klsdnklasndsal', 'kdklsandlkas', 1, '<p>nsakdlkas</p>', '2022-09-23 00:39:46', '2022-09-23 00:39:46'),
(75, 'DSEOP158BKTX', 'djksabdkjsabd', 'kldnksandanslkd', 'klsanldnasldnas', 'Contact Made', '2022-09-23', '530', '2022-09-23 06:40:14', 'ksamdasmdl;as', 'klsandlkasnldka', 1, '<p>ndsakldasnldna</p>', '2022-09-23 00:40:14', '2022-09-23 00:40:14'),
(76, 'DSEOP113KSB5', 'nsadlkasnd', 'nkenlqwne', 'kllksadasn', 'Contact Made', '2022-09-23', '530', '2022-09-23 06:41:27', 'dasndoasn', 'adsasdeas', 1, '<p>nklsandasdlkasn</p>', '2022-09-23 00:41:27', '2022-09-23 00:41:27'),
(77, 'DSEOP1EUISDA', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:43:03', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:43:03', '2022-09-23 00:43:03'),
(78, 'DSEOP1OBIYY0', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:44:25', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:44:25', '2022-09-23 00:44:25'),
(79, 'DSEOP1GPAK7A', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:45:00', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:45:00', '2022-09-23 00:45:00'),
(80, 'DSEOP1G875HR', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:45:12', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:45:12', '2022-09-23 00:45:12'),
(81, 'DSEOP10MCN6V', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:47:39', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:47:39', '2022-09-23 00:47:39'),
(82, 'DSEOP1BBJSU4', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:48:02', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:48:02', '2022-09-23 00:48:02'),
(83, 'DSEOP199N3YV', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:52:54', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:52:54', '2022-09-23 00:52:54'),
(84, 'DSEOP1JFD9NQ', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:53:07', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:53:07', '2022-09-23 00:53:07'),
(85, 'DSEOP186JZX1', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '5000', '2022-09-23 06:53:21', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 00:53:21', '2022-09-23 00:53:21'),
(86, 'DSEOP1LGY3MF', 'sjdnkasdnkas', ';ld;aslmd;las', 'sdlasndnaslk', 'Contact Made', '2022-09-23', '100', '2022-09-23 07:00:28', 'uiggeiuqwgeuqw', 'okeqpwokeopqw', 1, '<p>hiosodasdbnasbn</p>', '2022-09-23 01:00:28', '2022-09-23 01:00:28'),
(87, 'DSEOP1L76XD5', 'ssaknsandasn', 'dsajdpasjpdjas', 'kndsadnaskldnaskl', 'Contact Made', '2022-09-23', '100', '2022-09-23 07:01:15', 'sa,das,da\'sd,', 'kldnasmdkalsdmlkas', 1, '<p>od;asdasm;ldams</p>', '2022-09-23 01:01:15', '2022-09-23 01:01:15'),
(88, 'DSEOP1QZB63N', 'ihodehwqodqwd', 'jkdkasdaksj', 'jklsdnaslndas', 'Contact Made', '2022-09-23', '100', '2022-09-23 07:04:54', 'lk;da;sldmsam', 'mklsmdasmda', 1, '<p>nklsalndlaskd</p>', '2022-09-23 01:04:54', '2022-09-23 01:04:54'),
(89, 'DSEOP1UM46IY', 'sabjkdsakjndas', 'klndlksandasd', 'kdsakjbdsjkab', 'Contact Made', '2022-09-23', '100', '2022-09-23 07:07:45', 'nksldlknaskldnaslkd', 'nkldlsandsaklnd', 1, NULL, '2022-09-23 01:07:45', '2022-09-23 01:07:45'),
(90, 'DSEOP1EJ3LQ8', 'sabjkdsakjndas', 'klndlksandasd', 'kdsakjbdsjkab', 'Contact Made', '2022-09-23', '100', '2022-09-23 07:09:36', 'nksldlknaskldnaslkd', 'nkldlsandsaklnd', 1, NULL, '2022-09-23 01:09:36', '2022-09-23 01:09:36'),
(91, 'DSEOP1707O6K', 'jdkjasndjkalsndas', 'nkldnaslkdnasld', 'mkdsamd;lasmda', 'Contact Made', '2022-09-23', '600', '2022-09-23 07:14:44', 'l;dsadsamdas;m', 'samdasmdas;ld;a', 1, '<p>mldmsa;;das;dasml;</p>', '2022-09-23 01:14:44', '2022-09-23 01:14:44'),
(92, 'DSEOP1PITONE', 'jdkjasndjkalsndas', 'nkldnaslkdnasld', 'mkdsamd;lasmda', 'Contact Made', '2022-09-23', '600', '2022-09-23 07:16:12', 'l;dsadsamdas;m', 'samdasmdas;ld;a', 1, '<p>mldmsa;;das;dasml;</p>', '2022-09-23 01:16:12', '2022-09-23 01:16:12'),
(93, 'DSEOP1XTJ5D2', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:21:55', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:21:55', '2022-09-23 01:21:55'),
(94, 'DSEOP1TUPDBF', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:22:14', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:22:14', '2022-09-23 01:22:14'),
(95, 'DSEOP1VXLSRY', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:24:13', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:24:13', '2022-09-23 01:24:13'),
(96, 'DSEOP1JUSFMW', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:25:36', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:25:36', '2022-09-23 01:25:36'),
(97, 'DSEOP16A18U0', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:28:26', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:28:26', '2022-09-23 01:28:26'),
(98, 'DSEOP1YJJLQ1', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:34:17', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:34:17', '2022-09-23 01:34:17'),
(99, 'DSEOP1JERBUN', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:34:32', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:34:32', '2022-09-23 01:34:32'),
(100, 'DSEOP1DOO5QT', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:37:54', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:37:54', '2022-09-23 01:37:54'),
(101, 'DSEOP1ULAOI3', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:39:27', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:39:27', '2022-09-23 01:39:27'),
(102, 'DSEOP1OOCS46', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:39:56', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:39:56', '2022-09-23 01:39:56'),
(103, 'DSEOP1XIQ9JH', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:40:30', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:40:30', '2022-09-23 01:40:30'),
(104, 'DSEOP1H31JBO', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:42:18', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:42:18', '2022-09-23 01:42:18'),
(105, 'DSEOP1OQRWSX', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:43:45', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:43:45', '2022-09-23 01:43:45'),
(106, 'DSEOP1ZBARW5', 'nklsandasndanlk', 'klsnlkasnmdsan', 'lsadlmsad;mas', 'Contact Made', '2022-09-23', '300', '2022-09-23 07:43:54', 'lmsalmdl;asmda', 'kmsddsamd;las', 1, '<p>kjsdnsadnsadnsa</p>', '2022-09-23 01:43:54', '2022-09-23 01:43:54'),
(107, 'DSEOP11RQJWK', 'jdbskjdkasbbdjkas', 'iohdhsadhoiashd', 'jbsadnasbndla', 'Contact Made', '2022-09-23', '580', '2022-09-23 07:44:59', 'klndsnasnlkdlkas', 'kosandasndkas', 1, '<p>kdlkasndasn</p>', '2022-09-23 01:44:59', '2022-09-23 01:44:59'),
(108, 'DSEOP1GOILTC', 'g8eeqwegqwgiu', 'iowehoiqwehqw', 'knnsdnasdlkas', 'Contact Made', '2022-09-23', '400', '2022-09-23 07:45:34', 'sdashdaslkdhalsk', 'md;asdm;amd;a', 1, '<p>bjcxasdasbjkdjbksa</p>', '2022-09-23 01:45:34', '2022-09-23 01:45:34'),
(109, 'DSEOP1KJL6GA', 'dioadasndklas', 'md;asm;asm', 'nmkdlksandl;aksn', 'Contact Made', '2022-09-23', '500', '2022-09-23 07:46:08', 'jkasdnlasndlaks', 'nkidma;d;mas;d', 1, '<p>mdsadasmldmasl;dma;slm</p>', '2022-09-23 01:46:08', '2022-09-23 01:46:08'),
(110, 'DSEOP1KJNSZB', 'dasdasda', 'fasdasd', 'asddasd', 'Contact Made', '2022-09-24', '500', '2022-09-23 07:54:46', 'klsndlasndlaskd', 'kldnklasdnlkas', 1, '<p>dbaskdbkasdbas</p>', '2022-09-23 01:54:46', '2022-09-23 01:54:46'),
(111, 'DSEOP174CHZO', 'nsadnasdnkla', 'jbsadjasjbdjk', 'djasndlkasnd', 'Qualified', '2022-09-23', '200', '2022-09-23 09:40:31', 'kldmlskadnlaskd', 'kdnklasndlkans', 1, '<p>jsabdljkasndlkasn</p>', '2022-09-23 03:40:31', '2022-09-23 03:40:31'),
(112, 'DSEOP17L9SVJ', 'hadklasdnasnd', 'bdasdaksbdkaj', 'jkbdbkasbdaskjbd', 'Contact Made', '2022-09-23', '500', '2022-09-23 09:46:22', 'bdsndlkasndla', 'bjsdkasdkljasnd', 1, '<p>bdaskjdaskdbaskdbaskbd</p>', '2022-09-23 03:46:22', '2022-09-23 03:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `name`, `parent_id`, `created_at`, `updated_at`, `added_by`, `last_updated_by`) VALUES
(1, 'Project Manager', NULL, '2022-09-19 00:38:43', '2022-09-19 00:38:43', NULL, NULL),
(2, 'Lead Developer', 1, '2022-09-19 00:39:09', '2022-09-19 00:39:09', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `discussions`
--

CREATE TABLE `discussions` (
  `id` int(10) UNSIGNED NOT NULL,
  `discussion_category_id` int(10) UNSIGNED DEFAULT '1',
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '#232629',
  `user_id` int(10) UNSIGNED NOT NULL,
  `pinned` tinyint(1) NOT NULL DEFAULT '0',
  `closed` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `last_reply_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `best_answer_id` int(10) UNSIGNED DEFAULT NULL,
  `last_reply_by_id` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discussion_categories`
--

CREATE TABLE `discussion_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `discussion_categories`
--

INSERT INTO `discussion_categories` (`id`, `order`, `name`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 'General', '#3498DB', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_files`
--

CREATE TABLE `discussion_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `discussion_id` int(10) UNSIGNED DEFAULT NULL,
  `discussion_reply_id` int(10) UNSIGNED DEFAULT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discussion_replies`
--

CREATE TABLE `discussion_replies` (
  `id` int(10) UNSIGNED NOT NULL,
  `discussion_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_notification_settings`
--

CREATE TABLE `email_notification_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `setting_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `send_email` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `send_slack` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `send_push` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_notification_settings`
--

INSERT INTO `email_notification_settings` (`id`, `setting_name`, `send_email`, `send_slack`, `send_push`, `created_at`, `updated_at`, `slug`) VALUES
(1, 'New Expense/Added by Admin', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'new-expenseadded-by-admin'),
(2, 'New Expense/Added by Member', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'new-expenseadded-by-member'),
(3, 'Expense Status Changed', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'expense-status-changed'),
(4, 'New Support Ticket Request', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'new-support-ticket-request'),
(5, 'New Leave Application', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'new-leave-application'),
(6, 'Task Completed', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'task-completed'),
(7, 'Invoice Create/Update Notification', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'invoice-createupdate-notification'),
(8, 'Discussion Reply', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'discussion-reply'),
(9, 'New Product Purchase Request', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'new-product-purchase-request'),
(10, 'Lead notification', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'lead-notification'),
(11, 'Order Create/Update Notification', 'no', 'no', 'no', NULL, NULL, 'order-createupdate-notification'),
(12, 'User Join via Invitation', 'no', 'no', 'no', NULL, NULL, 'user-join-via-invitation'),
(13, 'Follow Up Reminder', 'no', 'no', 'no', NULL, NULL, 'follow-up-reminder'),
(14, 'User Registration/Added by Admin', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'user-registrationadded-by-admin'),
(15, 'Employee Assign to Project', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'employee-assign-to-project'),
(16, 'New Notice Published', 'no', 'no', 'no', NULL, NULL, 'new-notice-published'),
(17, 'User Assign to Task', 'no', 'no', 'no', NULL, '2022-09-19 00:43:29', 'user-assign-to-task');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_contacts`
--

CREATE TABLE `emergency_contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_details`
--

CREATE TABLE `employee_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `employee_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `hourly_rate` double DEFAULT NULL,
  `slack_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `designation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `joining_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_date` date DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `attendance_reminder` date DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `calendar_view` text COLLATE utf8mb4_unicode_ci,
  `about_me` text COLLATE utf8mb4_unicode_ci,
  `reporting_to` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_details`
--

INSERT INTO `employee_details` (`id`, `user_id`, `employee_id`, `address`, `hourly_rate`, `slack_username`, `department_id`, `designation_id`, `created_at`, `updated_at`, `joining_date`, `last_date`, `added_by`, `last_updated_by`, `attendance_reminder`, `date_of_birth`, `calendar_view`, `about_me`, `reporting_to`) VALUES
(1, 1, '1', NULL, NULL, NULL, NULL, NULL, '2022-09-19 00:15:47', '2022-09-19 00:15:47', '2022-09-19 06:15:47', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 9, '2', 'Dhaka', 8, 'company@example.com', 1, 1, '2022-09-19 00:44:40', '2022-09-19 00:44:40', '2022-09-18 18:00:00', NULL, 1, 1, NULL, '2022-09-13', 'task,events,holiday,tickets,leaves', 'Dhaka', NULL),
(3, 10, '3', 'sadasd', NULL, 'pm2@gmail.com', 1, 1, '2022-09-19 01:50:49', '2022-09-19 01:50:49', '2022-09-18 18:00:00', NULL, 1, 1, NULL, '2022-09-08', 'task,events,holiday,tickets,leaves', 'dasdasd', 9),
(4, 11, '4', 'sdas', NULL, 'pm3@gmail.com', 1, 1, '2022-09-19 01:51:45', '2022-09-19 01:51:45', '2022-09-18 18:00:00', NULL, 1, 1, NULL, '2022-09-07', 'task,events,holiday,tickets,leaves', 'asfas', 10),
(5, 12, '5', 'sdadasd', NULL, 'pm4.com', 1, 1, '2022-09-19 01:52:35', '2022-09-19 01:52:35', '2022-09-18 18:00:00', NULL, 1, 1, NULL, '2022-09-08', 'task,events,holiday,tickets,leaves', 'fsdfs', 10),
(6, 15, '6', 'sdasd', NULL, 'pm', 1, 1, '2022-09-22 04:25:57', '2022-09-22 04:25:57', '2022-09-21 18:00:00', NULL, 1, 1, NULL, '2022-09-22', 'task,events,holiday,tickets,leaves', 'asdasd', 1),
(7, 16, '7', 'sdsad', NULL, 'pm6', 1, 1, '2022-09-23 03:39:17', '2022-09-23 03:39:17', '2022-09-22 18:00:00', NULL, 1, 1, NULL, '2022-09-23', 'task,events,holiday,tickets,leaves', 'sdasdas', 9);

-- --------------------------------------------------------

--
-- Table structure for table `employee_docs`
--

CREATE TABLE `employee_docs` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_leave_quotas`
--

CREATE TABLE `employee_leave_quotas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `leave_type_id` int(10) UNSIGNED NOT NULL,
  `no_of_leaves` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_leave_quotas`
--

INSERT INTO `employee_leave_quotas` (`id`, `user_id`, `leave_type_id`, `no_of_leaves`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(2, 1, 2, 5, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(3, 1, 3, 5, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(4, 9, 1, 5, '2022-09-19 00:44:40', '2022-09-19 00:44:40'),
(5, 9, 2, 5, '2022-09-19 00:44:40', '2022-09-19 00:44:40'),
(6, 9, 3, 5, '2022-09-19 00:44:40', '2022-09-19 00:44:40'),
(7, 10, 1, 5, '2022-09-19 01:50:49', '2022-09-19 01:50:49'),
(8, 10, 2, 5, '2022-09-19 01:50:49', '2022-09-19 01:50:49'),
(9, 10, 3, 5, '2022-09-19 01:50:49', '2022-09-19 01:50:49'),
(10, 11, 1, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(11, 11, 2, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(12, 11, 3, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(13, 12, 1, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(14, 12, 2, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(15, 12, 3, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(16, 15, 1, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(17, 15, 2, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(18, 15, 3, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(19, 16, 1, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(20, 16, 2, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(21, 16, 3, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17');

-- --------------------------------------------------------

--
-- Table structure for table `employee_shifts`
--

CREATE TABLE `employee_shifts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shift_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shift_short_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `office_start_time` time NOT NULL,
  `office_end_time` time NOT NULL,
  `halfday_mark_time` time DEFAULT NULL,
  `late_mark_duration` tinyint(4) NOT NULL,
  `clockin_in_day` tinyint(4) NOT NULL,
  `office_open_days` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_shifts`
--

INSERT INTO `employee_shifts` (`id`, `shift_name`, `shift_short_code`, `color`, `office_start_time`, `office_end_time`, `halfday_mark_time`, `late_mark_duration`, `clockin_in_day`, `office_open_days`, `created_at`, `updated_at`) VALUES
(1, 'General Shift', 'GS', '#99C7F1', '09:00:00', '18:00:00', NULL, 20, 2, '[1,2,3,4,5]', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `employee_shift_change_requests`
--

CREATE TABLE `employee_shift_change_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shift_schedule_id` bigint(20) UNSIGNED NOT NULL,
  `employee_shift_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('waiting','accepted','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'waiting',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_shift_schedules`
--

CREATE TABLE `employee_shift_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `employee_shift_id` bigint(20) UNSIGNED NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `shift_start_time` datetime DEFAULT NULL,
  `shift_end_time` datetime DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_skills`
--

CREATE TABLE `employee_skills` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `skill_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_skills`
--

INSERT INTO `employee_skills` (`id`, `user_id`, `skill_id`, `created_at`, `updated_at`) VALUES
(1, 9, 1, '2022-09-19 00:44:40', '2022-09-19 00:44:40');

-- --------------------------------------------------------

--
-- Table structure for table `employee_teams`
--

CREATE TABLE `employee_teams` (
  `id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estimates`
--

CREATE TABLE `estimates` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `estimate_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_till` date NOT NULL,
  `sub_total` double(16,2) NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `total` double(16,2) NOT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('declined','accepted','waiting','sent','draft','canceled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'waiting',
  `note` mediumtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `send_status` tinyint(1) NOT NULL DEFAULT '1',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` text COLLATE utf8mb4_unicode_ci,
  `calculate_tax` enum('after_discount','before_discount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'after_discount'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estimate_items`
--

CREATE TABLE `estimate_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `estimate_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_summary` text COLLATE utf8mb4_unicode_ci,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `quantity` double(16,2) NOT NULL,
  `unit_price` double(16,2) NOT NULL,
  `amount` double(16,2) NOT NULL,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estimate_item_images`
--

CREATE TABLE `estimate_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `estimate_item_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `where` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime NOT NULL,
  `repeat` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `repeat_every` int(11) DEFAULT NULL,
  `repeat_cycles` int(11) DEFAULT NULL,
  `repeat_type` enum('day','week','month','year') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'day',
  `send_reminder` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `remind_time` int(11) DEFAULT NULL,
  `remind_type` enum('day','hour','minute') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'day',
  `event_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_attendees`
--

CREATE TABLE `event_attendees` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_files`
--

CREATE TABLE `event_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_date` date NOT NULL,
  `purchase_from` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double(16,2) NOT NULL,
  `currency_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `bill` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `can_claim` tinyint(1) NOT NULL DEFAULT '1',
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `expenses_recurring_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `approver_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses_category`
--

CREATE TABLE `expenses_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses_category_roles`
--

CREATE TABLE `expenses_category_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `expenses_category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses_recurring`
--

CREATE TABLE `expenses_recurring` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_of_month` int(11) DEFAULT '1',
  `day_of_week` int(11) DEFAULT '1',
  `payment_method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rotation` enum('monthly','weekly','bi-weekly','quarterly','half-yearly','annually','daily') COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_cycle` int(11) DEFAULT NULL,
  `unlimited_recurring` tinyint(1) NOT NULL DEFAULT '0',
  `price` double NOT NULL,
  `bill` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `description` text COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `purchase_from` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_storage`
--

CREATE TABLE `file_storage` (
  `id` int(10) UNSIGNED NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` int(10) UNSIGNED NOT NULL,
  `storage_location` enum('local','aws_s3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_storage_settings`
--

CREATE TABLE `file_storage_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `filesystem` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_keys` text COLLATE utf8mb4_unicode_ci,
  `status` enum('enabled','disabled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disabled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `file_storage_settings`
--

INSERT INTO `file_storage_settings` (`id`, `filesystem`, `auth_keys`, `status`, `created_at`, `updated_at`) VALUES
(1, 'local', NULL, 'enabled', '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `flags`
--

CREATE TABLE `flags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `capital` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `continent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flags`
--

INSERT INTO `flags` (`id`, `capital`, `code`, `continent`, `name`) VALUES
(1, 'Kabul', 'af', 'Asia', 'Afghanistan'),
(2, 'Mariehamn', 'ax', 'Europe', 'Aland Islands'),
(3, 'Tirana', 'al', 'Europe', 'Albania'),
(4, 'Algiers', 'dz', 'Africa', 'Algeria'),
(5, 'Pago Pago', 'as', 'Oceania', 'American Samoa'),
(6, 'Andorra la Vella', 'ad', 'Europe', 'Andorra'),
(7, 'Luanda', 'ao', 'Africa', 'Angola'),
(8, 'The Valley', 'ai', 'North America', 'Anguilla'),
(9, '', 'aq', '', 'Antarctica'),
(10, 'St. John\'s', 'ag', 'North America', 'Antigua and Barbuda'),
(11, 'Buenos Aires', 'ar', 'South America', 'Argentina'),
(12, 'Yerevan', 'am', 'Asia', 'Armenia'),
(13, 'Oranjestad', 'aw', 'South America', 'Aruba'),
(14, 'Georgetown', 'ac', 'Africa', 'Ascension Island'),
(15, 'Canberra', 'au', 'Oceania', 'Australia'),
(16, 'Vienna', 'at', 'Europe', 'Austria'),
(17, 'Baku', 'az', 'Asia', 'Azerbaijan'),
(18, 'Nassau', 'bs', 'North America', 'Bahamas'),
(19, 'Manama', 'bh', 'Asia', 'Bahrain'),
(20, 'Dhaka', 'bd', 'Asia', 'Bangladesh'),
(21, 'Bridgetown', 'bb', 'North America', 'Barbados'),
(22, 'Minsk', 'by', 'Europe', 'Belarus'),
(23, 'Brussels', 'be', 'Europe', 'Belgium'),
(24, 'Belmopan', 'bz', 'North America', 'Belize'),
(25, 'Porto-Novo', 'bj', 'Africa', 'Benin'),
(26, 'Hamilton', 'bm', 'North America', 'Bermuda'),
(27, 'Thimphu', 'bt', 'Asia', 'Bhutan'),
(28, 'Sucre', 'bo', 'South America', 'Bolivia'),
(29, 'Kralendijk', 'bq', 'South America', 'Bonaire, Sint Eustatius and Saba'),
(30, 'Sarajevo', 'ba', 'Europe', 'Bosnia and Herzegovina'),
(31, 'Gaborone', 'bw', 'Africa', 'Botswana'),
(32, '', 'bv', '', 'Bouvet Island'),
(33, 'Brasília', 'br', 'South America', 'Brazil'),
(34, 'Diego Garcia', 'io', 'Asia', 'British Indian Ocean Territory'),
(35, 'Bandar Seri Begawan', 'bn', 'Asia', 'Brunei Darussalam'),
(36, 'Sofia', 'bg', 'Europe', 'Bulgaria'),
(37, 'Ouagadougou', 'bf', 'Africa', 'Burkina Faso'),
(38, 'Bujumbura', 'bi', 'Africa', 'Burundi'),
(39, 'Praia', 'cv', 'Africa', 'Cabo Verde'),
(40, 'Phnom Penh', 'kh', 'Asia', 'Cambodia'),
(41, 'Yaoundé', 'cm', 'Africa', 'Cameroon'),
(42, 'Ottawa', 'ca', 'North America', 'Canada'),
(43, '', 'ic', '', 'Canary Islands'),
(44, '', 'es-ct', '', 'Catalonia'),
(45, 'George Town', 'ky', 'North America', 'Cayman Islands'),
(46, 'Bangui', 'cf', 'Africa', 'Central African Republic'),
(47, '', 'cefta', '', 'Central European Free Trade Agreement'),
(48, '', 'ea', '', 'Ceuta & Melilla'),
(49, 'N\'Djamena', 'td', 'Africa', 'Chad'),
(50, 'Santiago', 'cl', 'South America', 'Chile'),
(51, 'Beijing', 'cn', 'Asia', 'China'),
(52, 'Flying Fish Cove', 'cx', 'Asia', 'Christmas Island'),
(53, '', 'cp', '', 'Clipperton Island'),
(54, 'West Island', 'cc', 'Asia', 'Cocos (Keeling) Islands'),
(55, 'Bogotá', 'co', 'South America', 'Colombia'),
(56, 'Moroni', 'km', 'Africa', 'Comoros'),
(57, 'Avarua', 'ck', 'Oceania', 'Cook Islands'),
(58, 'San José', 'cr', 'North America', 'Costa Rica'),
(59, 'Zagreb', 'hr', 'Europe', 'Croatia'),
(60, 'Havana', 'cu', 'North America', 'Cuba'),
(61, 'Willemstad', 'cw', 'South America', 'Curaçao'),
(62, 'Nicosia', 'cy', 'Europe', 'Cyprus'),
(63, 'Prague', 'cz', 'Europe', 'Czech Republic'),
(64, 'Yamoussoukro', 'ci', 'Africa', 'Côte d\'Ivoire'),
(65, 'Kinshasa', 'cd', 'Africa', 'Democratic Republic of the Congo'),
(66, 'Copenhagen', 'dk', 'Europe', 'Denmark'),
(67, '', 'dg', '', 'Diego Garcia'),
(68, 'Djibouti', 'dj', 'Africa', 'Djibouti'),
(69, 'Roseau', 'dm', 'North America', 'Dominica'),
(70, 'Santo Domingo', 'do', 'North America', 'Dominican Republic'),
(71, 'Quito', 'ec', 'South America', 'Ecuador'),
(72, 'Cairo', 'eg', 'Africa', 'Egypt'),
(73, 'San Salvador', 'sv', 'North America', 'El Salvador'),
(74, 'London', 'gb-eng', 'Europe', 'England'),
(75, 'Malabo', 'gq', 'Africa', 'Equatorial Guinea'),
(76, 'Asmara', 'er', 'Africa', 'Eritrea'),
(77, 'Tallinn', 'ee', 'Europe', 'Estonia'),
(78, 'Lobamba, Mbabane', 'sz', 'Africa', 'Eswatini'),
(79, 'Addis Ababa', 'et', 'Africa', 'Ethiopia'),
(80, '', 'eu', '', 'Europe'),
(81, 'Stanley', 'fk', 'South America', 'Falkland Islands'),
(82, 'Tórshavn', 'fo', 'Europe', 'Faroe Islands'),
(83, 'Palikir', 'fm', 'Oceania', 'Federated States of Micronesia'),
(84, 'Suva', 'fj', 'Oceania', 'Fiji'),
(85, 'Helsinki', 'fi', 'Europe', 'Finland'),
(86, 'Paris', 'fr', 'Europe', 'France'),
(87, 'Cayenne', 'gf', 'South America', 'French Guiana'),
(88, 'Papeete', 'pf', 'Oceania', 'French Polynesia'),
(89, 'Saint-Pierre, Réunion', 'tf', 'Africa', 'French Southern Territories'),
(90, 'Libreville', 'ga', 'Africa', 'Gabon'),
(91, '', 'es-ga', '', 'Galicia'),
(92, 'Banjul', 'gm', 'Africa', 'Gambia'),
(93, 'Tbilisi', 'ge', 'Asia', 'Georgia'),
(94, 'Berlin', 'de', 'Europe', 'Germany'),
(95, 'Accra', 'gh', 'Africa', 'Ghana'),
(96, 'Gibraltar', 'gi', 'Europe', 'Gibraltar'),
(97, 'Athens', 'gr', 'Europe', 'Greece'),
(98, 'Nuuk', 'gl', 'North America', 'Greenland'),
(99, 'St. George\'s', 'gd', 'North America', 'Grenada'),
(100, 'Basse-Terre', 'gp', 'North America', 'Guadeloupe'),
(101, 'Hagåtña', 'gu', 'Oceania', 'Guam'),
(102, 'Guatemala City', 'gt', 'North America', 'Guatemala'),
(103, 'Saint Peter Port', 'gg', 'Europe', 'Guernsey'),
(104, 'Conakry', 'gn', 'Africa', 'Guinea'),
(105, 'Bissau', 'gw', 'Africa', 'Guinea-Bissau'),
(106, 'Georgetown', 'gy', 'South America', 'Guyana'),
(107, 'Port-au-Prince', 'ht', 'North America', 'Haiti'),
(108, '', 'hm', '', 'Heard Island and McDonald Islands'),
(109, 'Vatican City', 'va', 'Europe', 'Holy See'),
(110, 'Tegucigalpa', 'hn', 'North America', 'Honduras'),
(111, 'Hong Kong', 'hk', 'Asia', 'Hong Kong'),
(112, 'Budapest', 'hu', 'Europe', 'Hungary'),
(113, 'Reykjavik', 'is', 'Europe', 'Iceland'),
(114, 'New Delhi', 'in', 'Asia', 'India'),
(115, 'Jakarta', 'id', 'Asia', 'Indonesia'),
(116, 'Tehran', 'ir', 'Asia', 'Iran'),
(117, 'Baghdad', 'iq', 'Asia', 'Iraq'),
(118, 'Dublin', 'ie', 'Europe', 'Ireland'),
(119, 'Douglas', 'im', 'Europe', 'Isle of Man'),
(120, 'Jerusalem', 'il', 'Asia', 'Israel'),
(121, 'Rome', 'it', 'Europe', 'Italy'),
(122, 'Kingston', 'jm', 'North America', 'Jamaica'),
(123, 'Tokyo', 'jp', 'Asia', 'Japan'),
(124, 'Saint Helier', 'je', 'Europe', 'Jersey'),
(125, 'Amman', 'jo', 'Asia', 'Jordan'),
(126, 'Astana', 'kz', 'Asia', 'Kazakhstan'),
(127, 'Nairobi', 'ke', 'Africa', 'Kenya'),
(128, 'South Tarawa', 'ki', 'Oceania', 'Kiribati'),
(129, 'Pristina', 'xk', 'Europe', 'Kosovo'),
(130, 'Kuwait City', 'kw', 'Asia', 'Kuwait'),
(131, 'Bishkek', 'kg', 'Asia', 'Kyrgyzstan'),
(132, 'Vientiane', 'la', 'Asia', 'Laos'),
(133, 'Riga', 'lv', 'Europe', 'Latvia'),
(134, 'Beirut', 'lb', 'Asia', 'Lebanon'),
(135, 'Maseru', 'ls', 'Africa', 'Lesotho'),
(136, 'Monrovia', 'lr', 'Africa', 'Liberia'),
(137, 'Tripoli', 'ly', 'Africa', 'Libya'),
(138, 'Vaduz', 'li', 'Europe', 'Liechtenstein'),
(139, 'Vilnius', 'lt', 'Europe', 'Lithuania'),
(140, 'Luxembourg City', 'lu', 'Europe', 'Luxembourg'),
(141, 'Macau', 'mo', 'Asia', 'Macau'),
(142, 'Antananarivo', 'mg', 'Africa', 'Madagascar'),
(143, 'Lilongwe', 'mw', 'Africa', 'Malawi'),
(144, 'Kuala Lumpur', 'my', 'Asia', 'Malaysia'),
(145, 'Malé', 'mv', 'Asia', 'Maldives'),
(146, 'Bamako', 'ml', 'Africa', 'Mali'),
(147, 'Valletta', 'mt', 'Europe', 'Malta'),
(148, 'Majuro', 'mh', 'Oceania', 'Marshall Islands'),
(149, 'Fort-de-France', 'mq', 'North America', 'Martinique'),
(150, 'Nouakchott', 'mr', 'Africa', 'Mauritania'),
(151, 'Port Louis', 'mu', 'Africa', 'Mauritius'),
(152, 'Mamoudzou', 'yt', 'Africa', 'Mayotte'),
(153, 'Mexico City', 'mx', 'North America', 'Mexico'),
(154, 'Chișinău', 'md', 'Europe', 'Moldova'),
(155, 'Monaco', 'mc', 'Europe', 'Monaco'),
(156, 'Ulaanbaatar', 'mn', 'Asia', 'Mongolia'),
(157, 'Podgorica', 'me', 'Europe', 'Montenegro'),
(158, 'Little Bay, Brades, Plymouth', 'ms', 'North America', 'Montserrat'),
(159, 'Rabat', 'ma', 'Africa', 'Morocco'),
(160, 'Maputo', 'mz', 'Africa', 'Mozambique'),
(161, 'Naypyidaw', 'mm', 'Asia', 'Myanmar'),
(162, 'Windhoek', 'na', 'Africa', 'Namibia'),
(163, 'Yaren District', 'nr', 'Oceania', 'Nauru'),
(164, 'Kathmandu', 'np', 'Asia', 'Nepal'),
(165, 'Amsterdam', 'nl', 'Europe', 'Netherlands'),
(166, 'Nouméa', 'nc', 'Oceania', 'New Caledonia'),
(167, 'Wellington', 'nz', 'Oceania', 'New Zealand'),
(168, 'Managua', 'ni', 'North America', 'Nicaragua'),
(169, 'Niamey', 'ne', 'Africa', 'Niger'),
(170, 'Abuja', 'ng', 'Africa', 'Nigeria'),
(171, 'Alofi', 'nu', 'Oceania', 'Niue'),
(172, 'Kingston', 'nf', 'Oceania', 'Norfolk Island'),
(173, 'Pyongyang', 'kp', 'Asia', 'North Korea'),
(174, 'Skopje', 'mk', 'Europe', 'North Macedonia'),
(175, 'Belfast', 'gb-nir', 'Europe', 'Northern Ireland'),
(176, 'Saipan', 'mp', 'Oceania', 'Northern Mariana Islands'),
(177, 'Oslo', 'no', 'Europe', 'Norway'),
(178, 'Muscat', 'om', 'Asia', 'Oman'),
(179, 'Islamabad', 'pk', 'Asia', 'Pakistan'),
(180, 'Ngerulmud', 'pw', 'Oceania', 'Palau'),
(181, 'Panama City', 'pa', 'North America', 'Panama'),
(182, 'Port Moresby', 'pg', 'Oceania', 'Papua New Guinea'),
(183, 'Asunción', 'py', 'South America', 'Paraguay'),
(184, 'Lima', 'pe', 'South America', 'Peru'),
(185, 'Manila', 'ph', 'Asia', 'Philippines'),
(186, 'Adamstown', 'pn', 'Oceania', 'Pitcairn'),
(187, 'Warsaw', 'pl', 'Europe', 'Poland'),
(188, 'Lisbon', 'pt', 'Europe', 'Portugal'),
(189, 'San Juan', 'pr', 'North America', 'Puerto Rico'),
(190, 'Doha', 'qa', 'Asia', 'Qatar'),
(191, 'Brazzaville', 'cg', 'Africa', 'Republic of the Congo'),
(192, 'Bucharest', 'ro', 'Europe', 'Romania'),
(193, 'Moscow', 'ru', 'Europe', 'Russia'),
(194, 'Kigali', 'rw', 'Africa', 'Rwanda'),
(195, 'Saint-Denis', 're', 'Africa', 'Réunion'),
(196, 'Gustavia', 'bl', 'North America', 'Saint Barthélemy'),
(197, 'Jamestown', 'sh', 'Africa', 'Saint Helena, Ascension and Tristan da Cunha'),
(198, 'Basseterre', 'kn', 'North America', 'Saint Kitts and Nevis'),
(199, 'Castries', 'lc', 'North America', 'Saint Lucia'),
(200, 'Marigot', 'mf', 'North America', 'Saint Martin'),
(201, 'Saint-Pierre', 'pm', 'North America', 'Saint Pierre and Miquelon'),
(202, 'Kingstown', 'vc', 'North America', 'Saint Vincent and the Grenadines'),
(203, 'Apia', 'ws', 'Oceania', 'Samoa'),
(204, 'San Marino', 'sm', 'Europe', 'San Marino'),
(205, 'São Tomé', 'st', 'Africa', 'Sao Tome and Principe'),
(206, 'Riyadh', 'sa', 'Asia', 'Saudi Arabia'),
(207, 'Edinburgh', 'gb-sct', 'Europe', 'Scotland'),
(208, 'Dakar', 'sn', 'Africa', 'Senegal'),
(209, 'Belgrade', 'rs', 'Europe', 'Serbia'),
(210, 'Victoria', 'sc', 'Africa', 'Seychelles'),
(211, 'Freetown', 'sl', 'Africa', 'Sierra Leone'),
(212, 'Singapore', 'sg', 'Asia', 'Singapore'),
(213, 'Philipsburg', 'sx', 'North America', 'Sint Maarten'),
(214, 'Bratislava', 'sk', 'Europe', 'Slovakia'),
(215, 'Ljubljana', 'si', 'Europe', 'Slovenia'),
(216, 'Honiara', 'sb', 'Oceania', 'Solomon Islands'),
(217, 'Mogadishu', 'so', 'Africa', 'Somalia'),
(218, 'Pretoria', 'za', 'Africa', 'South Africa'),
(219, 'King Edward Point', 'gs', 'Antarctica', 'South Georgia and the South Sandwich Islands'),
(220, 'Seoul', 'kr', 'Asia', 'South Korea'),
(221, 'Juba', 'ss', 'Africa', 'South Sudan'),
(222, 'Madrid', 'es', 'Europe', 'Spain'),
(223, 'Sri Jayawardenepura Kotte, Colombo', 'lk', 'Asia', 'Sri Lanka'),
(224, 'Ramallah', 'ps', 'Asia', 'State of Palestine'),
(225, 'Khartoum', 'sd', 'Africa', 'Sudan'),
(226, 'Paramaribo', 'sr', 'South America', 'Suriname'),
(227, 'Longyearbyen', 'sj', 'Europe', 'Svalbard and Jan Mayen'),
(228, 'Stockholm', 'se', 'Europe', 'Sweden'),
(229, 'Bern', 'ch', 'Europe', 'Switzerland'),
(230, 'Damascus', 'sy', 'Asia', 'Syria'),
(231, 'Taipei', 'tw', 'Asia', 'Taiwan'),
(232, 'Dushanbe', 'tj', 'Asia', 'Tajikistan'),
(233, 'Dodoma', 'tz', 'Africa', 'Tanzania'),
(234, 'Bangkok', 'th', 'Asia', 'Thailand'),
(235, 'Dili', 'tl', 'Asia', 'Timor-Leste'),
(236, 'Lomé', 'tg', 'Africa', 'Togo'),
(237, 'Nukunonu, Atafu,Tokelau', 'tk', 'Oceania', 'Tokelau'),
(238, 'Nukuʻalofa', 'to', 'Oceania', 'Tonga'),
(239, 'Port of Spain', 'tt', 'South America', 'Trinidad and Tobago'),
(240, '', 'ta', '', 'Tristan da Cunha'),
(241, 'Tunis', 'tn', 'Africa', 'Tunisia'),
(242, 'Ankara', 'tr', 'Asia', 'Turkey'),
(243, 'Ashgabat', 'tm', 'Asia', 'Turkmenistan'),
(244, 'Cockburn Town', 'tc', 'North America', 'Turks and Caicos Islands'),
(245, 'Funafuti', 'tv', 'Oceania', 'Tuvalu'),
(246, 'Kampala', 'ug', 'Africa', 'Uganda'),
(247, 'Kiev', 'ua', 'Europe', 'Ukraine'),
(248, 'Abu Dhabi', 'ae', 'Asia', 'United Arab Emirates'),
(249, 'London', 'gb', 'Europe', 'United Kingdom'),
(250, '', 'un', '', 'United Nations'),
(251, 'Washington, D.C.', 'um', 'North America', 'United States Minor Outlying Islands'),
(252, 'Washington, D.C.', 'us', 'North America', 'United States of America'),
(253, '', 'xx', '', 'Unknown'),
(254, 'Montevideo', 'uy', 'South America', 'Uruguay'),
(255, 'Tashkent', 'uz', 'Asia', 'Uzbekistan'),
(256, 'Port Vila', 'vu', 'Oceania', 'Vanuatu'),
(257, 'Caracas', 've', 'South America', 'Venezuela'),
(258, 'Hanoi', 'vn', 'Asia', 'Vietnam'),
(259, 'Road Town', 'vg', 'North America', 'Virgin Islands (British)'),
(260, 'Charlotte Amalie', 'vi', 'North America', 'Virgin Islands (U.S.)'),
(261, 'Cardiff', 'gb-wls', 'Europe', 'Wales'),
(262, 'Mata-Utu', 'wf', 'Oceania', 'Wallis and Futuna'),
(263, 'Laayoune', 'eh', 'Africa', 'Western Sahara'),
(264, 'Sana\'a', 'ye', 'Asia', 'Yemen'),
(265, 'Lusaka', 'zm', 'Africa', 'Zambia'),
(266, 'Harare', 'zw', 'Africa', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `gdpr_settings`
--

CREATE TABLE `gdpr_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `enable_gdpr` tinyint(1) NOT NULL DEFAULT '0',
  `show_customer_area` tinyint(1) NOT NULL DEFAULT '0',
  `show_customer_footer` tinyint(1) NOT NULL DEFAULT '0',
  `top_information_block` longtext COLLATE utf8mb4_unicode_ci,
  `enable_export` tinyint(1) NOT NULL DEFAULT '0',
  `data_removal` tinyint(1) NOT NULL DEFAULT '0',
  `lead_removal_public_form` tinyint(1) NOT NULL DEFAULT '0',
  `terms_customer_footer` tinyint(1) NOT NULL DEFAULT '0',
  `terms` longtext COLLATE utf8mb4_unicode_ci,
  `policy` longtext COLLATE utf8mb4_unicode_ci,
  `public_lead_edit` tinyint(1) NOT NULL DEFAULT '0',
  `consent_customer` tinyint(1) NOT NULL DEFAULT '0',
  `consent_leads` tinyint(1) NOT NULL DEFAULT '0',
  `consent_block` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gdpr_settings`
--

INSERT INTO `gdpr_settings` (`id`, `enable_gdpr`, `show_customer_area`, `show_customer_footer`, `top_information_block`, `enable_export`, `data_removal`, `lead_removal_public_form`, `terms_customer_footer`, `terms`, `policy`, `public_lead_edit`, `consent_customer`, `consent_leads`, `consent_block`, `created_at`, `updated_at`) VALUES
(1, 0, 0, 0, NULL, 0, 0, 0, 0, NULL, NULL, 0, 0, 0, NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `google_calendar_modules`
--

CREATE TABLE `google_calendar_modules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lead_status` tinyint(1) NOT NULL DEFAULT '0',
  `leave_status` tinyint(1) NOT NULL DEFAULT '0',
  `invoice_status` tinyint(1) NOT NULL DEFAULT '0',
  `contract_status` tinyint(1) NOT NULL DEFAULT '0',
  `task_status` tinyint(1) NOT NULL DEFAULT '0',
  `event_status` tinyint(1) NOT NULL DEFAULT '0',
  `holiday_status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `google_calendar_modules`
--

INSERT INTO `google_calendar_modules` (`id`, `lead_status`, `leave_status`, `invoice_status`, `contract_status`, `task_status`, `event_status`, `holiday_status`, `created_at`, `updated_at`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `occassion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `sub_total` double(16,2) NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `total` double(16,2) NOT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('paid','unpaid','partial','canceled','draft') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `recurring` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `billing_cycle` int(11) DEFAULT NULL,
  `billing_interval` int(11) DEFAULT NULL,
  `billing_frequency` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_original_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `credit_note` tinyint(1) NOT NULL DEFAULT '0',
  `show_shipping_address` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `estimate_id` int(10) UNSIGNED DEFAULT NULL,
  `send_status` tinyint(1) NOT NULL DEFAULT '1',
  `due_amount` double(8,2) NOT NULL DEFAULT '0.00',
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `invoice_recurring_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` text COLLATE utf8mb4_unicode_ci,
  `calculate_tax` enum('after_discount','before_discount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'after_discount',
  `company_address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci,
  `custom_invoice_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_summary` text COLLATE utf8mb4_unicode_ci,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `quantity` double(16,2) NOT NULL,
  `unit_price` double(16,2) NOT NULL,
  `amount` double(16,2) NOT NULL,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item_images`
--

CREATE TABLE `invoice_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_item_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_recurring`
--

CREATE TABLE `invoice_recurring` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `sub_total` double NOT NULL DEFAULT '0',
  `total` double NOT NULL DEFAULT '0',
  `discount` double NOT NULL DEFAULT '0',
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_original_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `show_shipping_address` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `day_of_month` int(11) DEFAULT '1',
  `day_of_week` int(11) DEFAULT '1',
  `payment_method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rotation` enum('monthly','weekly','bi-weekly','quarterly','half-yearly','annually','daily') COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_cycle` int(11) DEFAULT NULL,
  `client_can_stop` tinyint(1) NOT NULL DEFAULT '1',
  `unlimited_recurring` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `shipping_address` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `calculate_tax` enum('after_discount','before_discount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'after_discount'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_recurring_items`
--

CREATE TABLE `invoice_recurring_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_recurring_id` bigint(20) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` double NOT NULL,
  `unit_price` double NOT NULL,
  `amount` double NOT NULL,
  `taxes` text COLLATE utf8mb4_unicode_ci,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `item_summary` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_recurring_item_images`
--

CREATE TABLE `invoice_recurring_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_recurring_item_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_settings`
--

CREATE TABLE `invoice_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_prefix` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_digit` int(10) UNSIGNED NOT NULL DEFAULT '3',
  `estimate_prefix` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EST',
  `estimate_digit` int(10) UNSIGNED NOT NULL DEFAULT '3',
  `credit_note_prefix` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CN',
  `credit_note_digit` int(10) UNSIGNED NOT NULL DEFAULT '3',
  `template` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_after` int(11) NOT NULL,
  `invoice_terms` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimate_terms` text COLLATE utf8mb4_unicode_ci,
  `gst_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_gst` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `logo` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hsn_sac_code_show` tinyint(1) NOT NULL DEFAULT '0',
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'en',
  `send_reminder` int(11) NOT NULL DEFAULT '0',
  `reminder` enum('after','every') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `send_reminder_after` int(11) NOT NULL DEFAULT '0',
  `tax_calculation_msg` tinyint(1) NOT NULL DEFAULT '0',
  `show_project` int(11) NOT NULL DEFAULT '0',
  `show_client_name` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `show_client_email` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `show_client_phone` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `show_client_company_address` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `show_client_company_name` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_settings`
--

INSERT INTO `invoice_settings` (`id`, `invoice_prefix`, `invoice_digit`, `estimate_prefix`, `estimate_digit`, `credit_note_prefix`, `credit_note_digit`, `template`, `due_after`, `invoice_terms`, `estimate_terms`, `gst_number`, `show_gst`, `created_at`, `updated_at`, `logo`, `hsn_sac_code_show`, `locale`, `send_reminder`, `reminder`, `send_reminder_after`, `tax_calculation_msg`, `show_project`, `show_client_name`, `show_client_email`, `show_client_phone`, `show_client_company_address`, `show_client_company_name`) VALUES
(1, 'INV', 3, 'EST', 3, 'CN', 3, 'invoice-5', 15, 'Thank you for your business.', NULL, NULL, 'no', '2022-09-19 00:15:06', '2022-09-19 00:15:06', NULL, 0, 'en', 0, NULL, 0, 0, 0, 'yes', 'yes', 'yes', 'yes', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('pending','resolved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_bases`
--

CREATE TABLE `knowledge_bases` (
  `id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_base_files`
--

CREATE TABLE `knowledge_base_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `knowledge_base_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` text COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_categories`
--

CREATE TABLE `knowledge_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `language_settings`
--

CREATE TABLE `language_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `language_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('enabled','disabled') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `flag_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `language_settings`
--

INSERT INTO `language_settings` (`id`, `language_code`, `language_name`, `status`, `created_at`, `updated_at`, `flag_code`) VALUES
(1, 'en', 'English', 'enabled', NULL, NULL, 'en'),
(2, 'ar', 'Arabic', 'disabled', NULL, NULL, 'ar'),
(3, 'de', 'German', 'disabled', NULL, NULL, 'de'),
(4, 'es', 'Spanish', 'disabled', NULL, NULL, 'es'),
(5, 'et', 'Estonian', 'disabled', NULL, NULL, 'et'),
(6, 'fa', 'Farsi', 'disabled', NULL, NULL, 'fa'),
(7, 'fr', 'French', 'disabled', NULL, NULL, 'fr'),
(8, 'gr', 'Greek', 'disabled', NULL, NULL, 'gr'),
(9, 'it', 'Italian', 'disabled', NULL, NULL, 'it'),
(10, 'nl', 'Dutch', 'disabled', NULL, NULL, 'nl'),
(11, 'pl', 'Polish', 'disabled', NULL, NULL, 'pl'),
(12, 'pt', 'Portuguese', 'disabled', NULL, NULL, 'pt'),
(13, 'pt-br', 'Portuguese (Brazil)', 'disabled', NULL, NULL, 'pt-br'),
(14, 'ro', 'Romanian', 'disabled', NULL, NULL, 'ro'),
(15, 'ru', 'Russian', 'disabled', NULL, NULL, 'ru'),
(16, 'tr', 'Turkish', 'disabled', NULL, NULL, 'tr'),
(17, 'zh-CN', 'Chinese (S)', 'disabled', NULL, NULL, 'zh-CN'),
(18, 'zh-TW', 'Chinese (T)', 'disabled', NULL, NULL, 'zh-TW');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `column_priority` int(11) NOT NULL,
  `agent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `salutation` enum('mr','mrs','miss','dr','sir','madam') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cell` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `office` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `next_follow_up` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `value` double DEFAULT '0',
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `client_id`, `source_id`, `status_id`, `column_priority`, `agent_id`, `company_name`, `website`, `address`, `salutation`, `client_name`, `client_email`, `mobile`, `cell`, `office`, `city`, `state`, `country`, `postal_code`, `note`, `next_follow_up`, `value`, `currency_id`, `category_id`, `added_by`, `last_updated_by`, `hash`, `created_at`, `updated_at`) VALUES
(1, NULL, 2, 1, 0, 1, 'Test', NULL, NULL, 'mr', 'Freealancing Client', 'company3@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '<p>test</p>', 'yes', 50, 1, 1, 1, 1, 'gtJWkvqSlRrfo1yU0saYvTPleEO1eD9p', '2022-09-21 20:10:18', '2022-09-21 20:10:18');

-- --------------------------------------------------------

--
-- Table structure for table `lead_agents`
--

CREATE TABLE `lead_agents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `status` enum('enabled','disabled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enabled',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_agents`
--

INSERT INTO `lead_agents` (`id`, `user_id`, `status`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 10, 'enabled', 1, 1, '2022-09-21 20:09:27', '2022-09-21 20:09:27');

-- --------------------------------------------------------

--
-- Table structure for table `lead_category`
--

CREATE TABLE `lead_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_category`
--

INSERT INTO `lead_category` (`id`, `category_name`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Developement', 1, 1, '2022-09-21 20:09:46', '2022-09-21 20:09:46');

-- --------------------------------------------------------

--
-- Table structure for table `lead_custom_forms`
--

CREATE TABLE `lead_custom_forms` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_fields_id` int(10) UNSIGNED DEFAULT NULL,
  `field_display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_order` int(11) NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_custom_forms`
--

INSERT INTO `lead_custom_forms` (`id`, `custom_fields_id`, `field_display_name`, `field_name`, `field_order`, `status`, `required`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Name', 'name', 1, 'active', 1, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(2, NULL, 'Email', 'email', 2, 'active', 1, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(3, NULL, 'Company Name', 'company_name', 4, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(4, NULL, 'Website', 'website', 5, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(5, NULL, 'Address', 'address', 6, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(6, NULL, 'Mobile', 'mobile', 3, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(7, NULL, 'Message', 'message', 7, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(8, NULL, 'City', 'city', 8, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(9, NULL, 'State', 'state', 9, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(10, NULL, 'Country', 'country', 10, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59'),
(11, NULL, 'Postal Code', 'postal_code', 11, 'active', 0, NULL, NULL, '2022-09-19 00:15:06', '2022-09-21 19:55:59');

-- --------------------------------------------------------

--
-- Table structure for table `lead_files`
--

CREATE TABLE `lead_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead_follow_up`
--

CREATE TABLE `lead_follow_up` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `remark` longtext COLLATE utf8mb4_unicode_ci,
  `next_follow_up_date` datetime DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci,
  `send_reminder` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `remind_time` text COLLATE utf8mb4_unicode_ci,
  `remind_type` enum('minute','hour','day') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead_notes`
--

CREATE TABLE `lead_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `member_id` int(10) UNSIGNED DEFAULT NULL,
  `is_lead_show` tinyint(1) NOT NULL DEFAULT '0',
  `ask_password` tinyint(1) NOT NULL DEFAULT '0',
  `details` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_notes`
--

INSERT INTO `lead_notes` (`id`, `lead_id`, `title`, `type`, `member_id`, `is_lead_show`, `ask_password`, `details`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Note', 0, NULL, 0, 0, '<p>test</p>', 1, 1, '2022-09-21 20:10:18', '2022-09-21 20:10:18');

-- --------------------------------------------------------

--
-- Table structure for table `lead_sources`
--

CREATE TABLE `lead_sources` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_sources`
--

INSERT INTO `lead_sources` (`id`, `type`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 'email', NULL, NULL, NULL, NULL),
(2, 'google', NULL, NULL, NULL, NULL),
(3, 'facebook', NULL, NULL, NULL, NULL),
(4, 'friend', NULL, NULL, NULL, NULL),
(5, 'direct visit', NULL, NULL, NULL, NULL),
(6, 'tv ad', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lead_status`
--

CREATE TABLE `lead_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `default` tinyint(1) NOT NULL,
  `label_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ff0000',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_status`
--

INSERT INTO `lead_status` (`id`, `type`, `priority`, `default`, `label_color`, `created_at`, `updated_at`) VALUES
(1, 'pending', 1, 1, '#ff0000', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(2, 'inprocess', 2, 0, '#ff0000', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(3, 'converted', 3, 0, '#ff0000', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `lead_user_notes`
--

CREATE TABLE `lead_user_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `lead_note_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `leave_type_id` int(10) UNSIGNED NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leave_date` date NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('approved','pending','rejected') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reject_reason` text COLLATE utf8mb4_unicode_ci,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci,
  `approved_by` int(10) UNSIGNED DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `half_day_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_types`
--

CREATE TABLE `leave_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `type_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_of_leaves` int(11) NOT NULL DEFAULT '5',
  `paid` tinyint(1) NOT NULL DEFAULT '1',
  `monthly_limit` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave_types`
--

INSERT INTO `leave_types` (`id`, `type_name`, `color`, `no_of_leaves`, `paid`, `monthly_limit`, `created_at`, `updated_at`) VALUES
(1, 'Casual', '#16813D', 5, 1, 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(2, 'Sick', '#DB1313', 5, 1, 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(3, 'Earned', '#B078C6', 5, 1, 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `log_time_for`
--

CREATE TABLE `log_time_for` (
  `id` int(10) UNSIGNED NOT NULL,
  `log_time_for` enum('project','task') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'project',
  `auto_timer_stop` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `approval_required` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log_time_for`
--

INSERT INTO `log_time_for` (`id`, `log_time_for`, `auto_timer_stop`, `approval_required`, `created_at`, `updated_at`) VALUES
(1, 'project', 'no', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `ltm_translations`
--

CREATE TABLE `ltm_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `menu_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `translate_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `route` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `setting_menu` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_settings`
--

CREATE TABLE `menu_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `main_menu` longtext COLLATE utf8mb4_unicode_ci,
  `default_main_menu` longtext COLLATE utf8mb4_unicode_ci,
  `setting_menu` longtext COLLATE utf8mb4_unicode_ci,
  `default_setting_menu` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message_settings`
--

CREATE TABLE `message_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `allow_client_admin` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `allow_client_employee` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `restrict_client` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message_settings`
--

INSERT INTO `message_settings` (`id`, `allow_client_admin`, `allow_client_employee`, `restrict_client`, `created_at`, `updated_at`) VALUES
(1, 'no', 'no', 'no', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_04_02_193005_create_translations_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2016_06_20_112951_create_user_chat_table', 1),
(5, '2017_03_23_110416_add_column_users_table', 1),
(6, '2017_03_23_111036_create_client_details_table', 1),
(7, '2017_03_23_112028_create_client_contacts_table', 1),
(8, '2017_03_23_112353_create_employee_details_table', 1),
(9, '2017_03_23_114438_create_organisation_settings_table', 1),
(10, '2017_03_23_122646_create_project_category_table', 1),
(11, '2017_03_23_123601_create_projects_table', 1),
(12, '2017_03_23_125424_create_project_members_table', 1),
(13, '2017_03_23_125625_create_project_time_logs_table', 1),
(14, '2017_03_23_130413_create_project_files_table', 1),
(15, '2017_03_24_051800_create_tasks_table', 1),
(16, '2017_03_24_054355_create_notices_table', 1),
(17, '2017_03_24_055005_create_conversation_table', 1),
(18, '2017_03_24_055539_create_conversation_reply_table', 1),
(19, '2017_03_24_055859_create_invoices_table', 1),
(20, '2017_03_24_060421_create_invoice_items_table', 1),
(21, '2017_03_24_060751_create_quotations_table', 1),
(22, '2017_03_24_061241_create_quotation_items_table', 1),
(23, '2017_03_24_061505_create_sticky_notes_table', 1),
(24, '2017_03_24_064541_create_issues_table', 1),
(25, '2017_03_29_123858_entrust_setup_tables', 1),
(26, '2017_04_04_193158_AddColumnsProjectFilesTable', 1),
(27, '2017_04_05_063103_change_clientid_projectid_invoice_table', 1),
(28, '2017_04_06_051401_add_discount_column_invoice_table', 1),
(29, '2017_04_06_054728_add_status_column_issues_table', 1),
(30, '2017_04_08_152902_add_total_hours_column_time_log_table', 1),
(31, '2017_04_18_095809_create_project_activity_table', 1),
(32, '2017_04_18_103815_create_user_activities_table', 1),
(33, '2017_04_19_101519_create_email_notification_settings_table', 1),
(34, '2017_04_20_185211_add_colour_column_sticky_notes_table', 1),
(35, '2017_04_28_114154_create_notifications_table', 1),
(36, '2017_05_03_131016_add_project_completion_field_projects', 1),
(37, '2017_05_03_174333_create_currencies_table', 1),
(38, '2017_05_05_124330_create_module_settings_table', 1),
(39, '2017_05_05_233111_add_status_column_invoices', 1),
(40, '2017_05_11_140502_add_currency_symbol_column_invoices', 1),
(41, '2017_05_11_170244_add_currency_id_column_organisation_settings_table', 1),
(42, '2017_05_22_172748_add_timezone_column_settings_table', 1),
(43, '2017_05_24_120216_create_smtp_settings_table', 1),
(44, '2017_05_31_112158_create_universal_search_table', 1),
(45, '2017_06_22_131112_add_locale_organisation_settings_table', 1),
(46, '2017_07_13_091922_add_calculate_task_progress_column_project_table', 1),
(47, '2017_07_20_093528_on_delete_setnull_timelog', 1),
(48, '2017_07_21_120958_create_theme_settings_table', 1),
(49, '2017_07_24_113657_add_link_color_column_theme_settings_table', 1),
(50, '2017_07_24_123050_add_login_background_organisation_settings_table', 1),
(51, '2017_07_27_101351_add_column_type_invoice_items_table', 1),
(52, '2017_07_28_102010_create_estimates_table', 1),
(53, '2017_07_28_103230_create_estimate_items_table', 1),
(54, '2017_08_04_064431_create_payments_table', 1),
(55, '2017_08_05_103940_create_payment_gateway_credential_table', 1),
(56, '2017_08_08_055908_add_enable_paypal_column_payment_gateway_table', 1),
(57, '2017_08_09_054230_create_expenses_table', 1),
(58, '2017_08_21_065430_add_exchange_rate_column_currency_table', 1),
(59, '2017_08_21_131318_create_invoice_setting_table', 1),
(60, '2017_08_22_055908_add_expense_email_setting_to_email_notification_setting_table', 1),
(61, '2017_08_28_110759_add_recurring_columns_in_invoice_table', 1),
(62, '2017_08_30_061016_add_plan_id_to_payments_table', 1),
(63, '2017_08_30_093400_create_settings_table', 1),
(64, '2017_08_30_123956_add_slack_username_column_employee_details_table', 1),
(65, '2017_08_30_133725_add_send_slack_column_email_notification_settings_table', 1),
(66, '2017_09_01_060715_add_stipe_column_to_payment_credentials_table', 1),
(67, '2017_09_01_090124_add_customer_id_column_to_payments_table', 1),
(68, '2017_09_02_084049_add_locale_column_users_table', 1),
(69, '2017_09_14_095429_create_ticket_reply_templates_table', 1),
(70, '2017_09_14_095815_create_ticket_types_table', 1),
(71, '2017_09_14_100400_create_ticket_groups_table', 1),
(72, '2017_09_14_100530_create_ticket_tag_list_table', 1),
(73, '2017_09_14_114900_create_ticket_channels_table', 1),
(74, '2017_09_14_115003_create_ticket_agent_groups_table', 1),
(75, '2017_09_14_115004_create_tickets_table', 1),
(76, '2017_09_14_115005_create_ticket_tags_table', 1),
(77, '2017_09_18_064917_add_status_column_ticket_agent_group_table', 1),
(78, '2017_09_24_101700_create_ticket_replies_table', 1),
(79, '2017_09_25_060229_drop_description_column_ticket_table', 1),
(80, '2017_09_25_072611_add_deleted_at_column_tickets', 1),
(81, '2017_09_25_072627_add_deleted_at_column_ticket_reply', 1),
(82, '2017_10_03_094922_ticket_notification_migration', 1),
(83, '2017_10_03_134003_add_latitude_longitude_column', 1),
(84, '2017_10_12_111741_create_attendance_setting_table', 1),
(85, '2017_10_13_051909_create_attendance_table', 1),
(86, '2017_10_26_051335_add_mail_from_email_column_smtp_settings_table', 1),
(87, '2017_10_26_112253_add_office_open_days_column_attendance_settings_table', 1),
(88, '2017_11_01_054603_add_columns_to_client_details', 1),
(89, '2017_11_02_045542_change_on_cascade_project_members', 1),
(90, '2017_11_07_054438_add_project_admin_column_project_table', 1),
(91, '2017_11_07_125619_remove_project_admin_role', 1),
(92, '2017_11_08_045549_make_project_id_nullable_tasks_table', 1),
(93, '2017_11_09_071318_create_taskboard_columns_table', 1),
(94, '2017_11_09_092817_add_column_tasks_table', 1),
(95, '2017_11_20_070830_create_custom_fields_table', 1),
(96, '2017_11_20_071758_create_custom_fields__data_table', 1),
(97, '2017_11_22_071535_create_events_table', 1),
(98, '2017_11_23_065323_add_cryptocurrency_columns', 1),
(99, '2017_11_24_103957_create_event_attendees_table', 1),
(100, '2017_12_07_034433_change cascade users in time log table', 1),
(101, '2017_12_12_071823_create_modules_table', 1),
(102, '2017_12_12_073501_add_module_id_column_permissions_table', 1),
(103, '2017_12_21_114839_change_upload_folder', 1),
(104, '2017_12_28_112910_create_leave_types_table', 1),
(105, '2017_12_30_184422_create_leaves_table', 1),
(106, '2018_01_02_122442_add_leaves_notification_setting', 1),
(107, '2018_01_05_062543_add_user_css_column_theme_settings', 1),
(108, '2018_01_09_180937_add_task_completed_notification_setting', 1),
(109, '2018_01_29_073527_create_message_setting_table', 1),
(110, '2018_04_12_100452_add_dropbox_link_column_project_files_table', 1),
(111, '2018_04_12_123243_create_file_storage_table', 1),
(112, '2018_04_13_072732_create_groups_table', 1),
(113, '2018_04_13_092757_create_employee_groups_table', 1),
(114, '2018_04_17_113657_set_attendance_late_column_default', 1),
(115, '2018_05_07_065407_alter_invoice_id_null_payments', 1),
(116, '2018_05_07_065557_add_currency_id_column_payments_table', 1),
(117, '2018_05_08_064539_add_note_column_invoices', 1),
(118, '2018_05_15_072536_add_project_id_column_payments', 1),
(119, '2018_05_28_094515_set_gateway_column_null_payments_table', 1),
(120, '2018_05_29_070343_change_completed_on_column_to_datetime', 1),
(121, '2018_05_29_114402_populate_file_storage_settings_table', 1),
(122, '2018_05_30_051128_add_google_url_to_project_files_table', 1),
(123, '2018_06_05_092136_create_sub_tasks_table', 1),
(124, '2018_06_06_091511_create_task_comments_table', 1),
(125, '2018_06_11_054204_create_push_subscriptions_table', 1),
(126, '2018_06_14_094059_create_taxes_table', 1),
(127, '2018_06_18_065034_add_tax_id_column_invoice_items_table', 1),
(128, '2018_06_18_071442_add_discount_column_invoice_items_table', 1),
(129, '2018_06_21_052408_change_default_taskboard_columns', 1),
(130, '2018_06_26_160023_add_leave_count_column_leave_types_table', 1),
(131, '2018_06_27_072813_add_leaves_start_from_column', 1),
(132, '2018_06_27_075233_add_joining_date_column', 1),
(133, '2018_06_27_113713_add_gender_column_users_table', 1),
(134, '2018_06_28_054604_add_client_view_task_column_project_table', 1),
(135, '2018_06_28_191256_create_language_settings_table', 1),
(136, '2018_06_29_060331_add_active_theme_column_settings', 1),
(137, '2018_06_29_081128_add_manual_timelog_column_project_timelog', 1),
(138, '2018_06_29_104709_seed_languages', 1),
(139, '2018_08_02_121259_add_minutes_column_time_log_table', 1),
(140, '2018_08_22_103829_add_leaves_module', 1),
(141, '2018_08_22_104302_add_leaves_permissions', 1),
(142, '2018_08_27_114329_add_module_list_in_module_settings', 1),
(143, '2018_08_30_065158_add_status_column_users_table', 1),
(144, '2018_08_31_095814_create_lead_table', 1),
(145, '2018_08_31_095815_create_lead_source_table', 1),
(146, '2018_08_31_095815_create_lead_status_table', 1),
(147, '2018_08_31_095816_create_lead_follow_up_table', 1),
(148, '2018_09_04_095158_alter_lead_table', 1),
(149, '2018_09_04_095816_add_lead_module', 1),
(150, '2018_09_05_102010_create_proposal_table', 1),
(151, '2018_09_05_113230_create_proposal_items_table', 1),
(152, '2018_09_07_051239_alter_lead_website_table', 1),
(153, '2018_09_15_174026_add_default_lead_settings', 1),
(154, '2018_09_17_045718_add_leads_permission', 1),
(155, '2018_09_19_091643_add_remarks_to_payments_table', 1),
(156, '2018_09_19_100708_create_products_table', 1),
(157, '2018_09_21_095816_create_offline_payment_method_table', 1),
(158, '2018_09_25_065158_alter_payment_table', 1),
(159, '2018_09_28_110029_create_log_time_for_table', 1),
(160, '2018_09_28_965158_alter_project_time_log_table', 1),
(161, '2018_10_08_091643_alter_project_table', 1),
(162, '2018_10_08_110029_create_lead_files_table', 1),
(163, '2018_10_10_110029_create_holidays_table', 1),
(164, '2018_10_10_123601_create_project_templates_table', 1),
(165, '2018_10_10_125424_create_project_template_members_table', 1),
(166, '2018_10_10_135816_add_holiday_module', 1),
(167, '2018_10_10_251800_create_project_template_tasks_table', 1),
(168, '2018_10_16_095816_add_holiday_module_detail', 1),
(169, '2018_10_17_081757_remove_config_datatable_file', 1),
(170, '2018_10_17_965158_alter_leads_address_table', 1),
(171, '2018_10_17_965168_alter_leads_phone_table', 1),
(172, '2018_10_18_091643_alter_attendance_setting_table', 1),
(173, '2018_10_19_045718_add_holidays_permission', 1),
(174, '2018_10_20_094413_add_products_module', 1),
(175, '2018_10_20_094504_add_products_permissions', 1),
(176, '2018_10_21_051239_alter_holiday_website_table', 1),
(177, '2018_10_24_071300_add_file_column_to_invoices_table', 1),
(178, '2018_10_24_965158_alter_employee_detail_table', 1),
(179, '2018_10_29_965158_alter_attendance_setting_default_table', 1),
(180, '2018_11_10_071300_alter_user_table', 1),
(181, '2018_11_10_122646_create_task_category_table', 1),
(182, '2018_11_30_965158_alter_invoice_item_table', 1),
(183, '2018_12_12_965158_alter_invoice_estimate_response_table', 1),
(184, '2018_12_14_094504_add_expenses_permissions', 1),
(185, '2018_12_14_194504_add_expenses_permissions_detail', 1),
(186, '2018_12_20_1065158_alter_company_setting_table', 1),
(187, '2018_12_20_965158_alter_estimate_quantity_table', 1),
(188, '2018_12_27_074504_check_verify_purchase_file', 1),
(189, '2018_12_28_075730_create_push_notification_settings_table', 1),
(190, '2018_12_28_082056_add_send_push_column_email_notification_table', 1),
(191, '2018_12_28_123245_add_onesignal_player_id_column_users_table', 1),
(192, '2019_01_02_1065158_alter_module_setting_table', 1),
(193, '2019_01_02_2065158_insert_module_setting_client_table', 1),
(194, '2019_01_04_110029_create_employee_docs_table', 1),
(195, '2019_01_21_1065158_alter_task_creator_table', 1),
(196, '2019_02_06_1065158_alter_attendance_check_table', 1),
(197, '2019_02_11_1065158_alter_log_time_for_table', 1),
(198, '2019_02_12_2065158_insert_module_setting_client_task_table', 1),
(199, '2019_02_13_110029_create_skills_table', 1),
(200, '2019_02_13_130029_create_employee_skills_table', 1),
(201, '2019_02_15_1065158_alter_employee_end_date_table', 1),
(202, '2019_02_15_1165158_alter_custom_status_table', 1),
(203, '2019_02_20_074848_create_jobs_table', 1),
(204, '2019_02_22_1165158_add_company_currency_api_google_api', 1),
(205, '2019_03_11_965158_alter_expenses_quantity_table', 1),
(206, '2019_04_03_965158_alter_project_deadline_table', 1),
(207, '2019_04_04_074848_alter_invoice_setting_table', 1),
(208, '2019_04_04_075848_alter_client_Details_table', 1),
(209, '2019_04_10_075848_alter_setting_task_table', 1),
(210, '2019_04_10_122921_add_weather_key_column', 1),
(211, '2019_04_12_100242_add_columns_projects_table', 1),
(212, '2019_04_15_115700_add_budget_columns_projects_table', 1),
(213, '2019_04_17_070105_create_project_milestones_table', 1),
(214, '2019_04_23_062017_add_item_summary_column_invoice_item_table', 1),
(215, '2019_04_23_083812_add_invoice_created_column_project_milestones_table', 1),
(216, '2019_04_23_101747_add_milestone_id_column_tasks_table', 1),
(217, '2019_06_04_180628_change_project_budget_field_type', 1),
(218, '2019_06_07_070913_add_tax_id_column_estimate_items_table', 1),
(219, '2019_06_07_080053_add_discount_column_estimates_table', 1),
(220, '2019_07_01_192543_change_size_price_in_double', 1),
(221, '2019_07_02_072314_add_description_column_products_table', 1),
(222, '2019_07_15_110127_add_project_id_column_in_expenses_table', 1),
(223, '2019_08_13_073129_update_settings_add_envato_key', 1),
(224, '2019_08_13_073129_update_settings_add_support_key', 1),
(225, '2019_08_16_080219_change_price_size_proposal', 1),
(226, '2019_08_17_072443_add_datepicker_format_column_in_settings', 1),
(227, '2019_08_19_000000_create_failed_jobs_table', 1),
(228, '2019_08_19_085009_add_google_recaptcha_columns_in_organisation_settings_table', 1),
(229, '2019_08_19_120826_add_app_debug_column_in_organisation_settings_table', 1),
(230, '2019_08_22_055908_add_invoice_email_setting_to_email_notification_setting_table', 1),
(231, '2019_08_22_121805_add_external_link_column_project_files_table', 1),
(232, '2019_08_26_120718_add_offline_method_id_column_payments_table', 1),
(233, '2019_08_28_081847_update_smtp_setting_verified', 1),
(234, '2019_08_29_140115_make_smtp_type_nullable', 1),
(235, '2019_08_30_102114_add_reminder_fields_in_events_table', 1),
(236, '2019_09_03_103533_add_razorpay_column', 1),
(237, '2019_09_04_115714_add_recurring_task_id_column_in_tasks_table', 1),
(238, '2019_09_05_061308_create_project_settings_table', 1),
(239, '2019_09_09_045256_add_estimate_number_column_in_estimates_table', 1),
(240, '2019_09_09_081030_add_rounded_theme_column', 1),
(241, '2019_09_09_115714_add_cron_job_message_hide_table', 1),
(242, '2019_09_10_1074848_create_designation_table', 1),
(243, '2019_09_10_111909_add_columns_in_invoice_settings_table', 1),
(244, '2019_09_10_115714_add_team_field_employee_table', 1),
(245, '2019_09_10_161408_create_credit_note_table', 1),
(246, '2019_09_10_161418_create_credit_note_item_table', 1),
(247, '2019_09_10_161428_add_credit_note_column_in_invoices_table', 1),
(248, '2019_09_14_074854_add_status_column_projects_table', 1),
(249, '2019_09_16_101138_create_gdpr_settings_table', 1),
(250, '2019_09_17_091214_create_removal_requests_table', 1),
(251, '2019_09_18_191957_add_payments_module_clients', 1),
(252, '2019_09_25_095015_create_removal_requests_lead_table', 1),
(253, '2019_09_25_183130_create_dashboard_widgets_table', 1),
(254, '2019_09_27_212735_add_timelog_module_clients', 1),
(255, '2019_10_04_101818_add_paypal_mode_in_payment_gateway_credentials_table', 1),
(256, '2019_10_10_115133_alter_status_column_in_estimates_table', 1),
(257, '2019_10_14_060314_create_accept_estimates_table', 1),
(258, '2019_10_14_090840_alter_project_id_column_in_invoices_table', 1),
(259, '2019_10_14_110606_add_estimate_id_column_in_invoices_table', 1),
(260, '2019_10_15_052931_create_contract_types_table', 1),
(261, '2019_10_15_052932_create_contracts_table', 1),
(262, '2019_10_15_084310_add_contract_module_in_module_settings', 1),
(263, '2019_10_15_115655_create_contract_signs_table', 1),
(264, '2019_10_15_120940_create_invoice_credit_note_pivot_table', 1),
(265, '2019_10_17_051544_create_contract_discussions_table', 1),
(266, '2019_10_18_045028_alter_credit_note_status_in_credit_notes_table', 1),
(267, '2019_10_21_130413_create_task_files_table', 1),
(268, '2019_10_21_230413_create_ticket_files_table', 1),
(269, '2019_10_22_063419_add_dependent_task_id_in_tasks_table', 1),
(270, '2019_10_23_122412_create_contract_renews_table', 1),
(271, '2019_10_24_045038_add_column_module_type_in_universal_search_table', 1),
(272, '2019_10_24_120220_add_origin_amount_column_in_contracts_table', 1),
(273, '2019_10_30_045045_add_column_invoice_item_table', 1),
(274, '2019_10_30_122412_create_lead_agent_table', 1),
(275, '2019_10_31_045055_add_column_credit_note_item_table', 1),
(276, '2019_10_31_045065_add_column_estimate_item_table', 1),
(277, '2019_11_01_045075_add_column_products_table', 1),
(278, '2019_11_01_142619_add_column_to_in_notices_table', 1),
(279, '2019_11_05_082637_add_client_id_in_invoices_table', 1),
(280, '2019_11_07_082637_add_purchase_allow_in_product_table', 1),
(281, '2019_11_12_054145_add_system_update_column_in_organisation_settings_table', 1),
(282, '2019_11_13_054155_add_employee_id_column_in_employee_details_table', 1),
(283, '2019_11_14_054145_add_discount_column_in_proposal_table', 1),
(284, '2019_11_14_064145_add_tax_column_in_proposal_item_table', 1),
(285, '2019_11_21_064155_add_task_module_in_module_setting_table', 1),
(286, '2019_12_01_115133_alter_invoice_status_table', 1),
(287, '2019_12_09_171149_make_taxes_nullable_propsal_items_table', 1),
(288, '2019_12_18_115133_alter_proposal_items_table', 1),
(289, '2019_12_19_115850_add_timelogs_client_modules', 1),
(290, '2019_12_20_143625_add_logo_background_color_column_settings_table', 1),
(291, '2020_01_09_100241_add_client_id_credit_note_table', 1),
(292, '2020_01_09_105514_set_default_status_credit_note_open', 1),
(293, '2020_01_09_121406_add_task_reminder_columns', 1),
(294, '2020_01_22_122009_add_is_private_column_tasks_table', 1),
(295, '2020_01_23_062328_create_task_history_table', 1),
(296, '2020_01_24_134008_add_default_task_status_column_organisation_settings', 1),
(297, '2020_01_27_122145_create_pusher_settings_table', 1),
(298, '2020_02_01_101914_update_settings_review', 1),
(299, '2020_02_04_061753_add_team_id_field_in_projects_table', 1),
(300, '2020_02_04_132100_add_contracts_permission', 1),
(301, '2020_02_10_093726_create_table_menu', 1),
(302, '2020_02_14_102832_create_task_users_table', 1),
(303, '2020_02_17_143257_add_slug_email_notification_table', 1),
(304, '2020_02_21_121956_update_storage_settings_to_local', 1),
(305, '2020_02_24_060416_update_invoice_setting_logo', 1),
(306, '2020_03_11_054833_add_shipping_address_field_in_client_details_table', 1),
(307, '2020_03_11_085729_add_show_shipping_field_in_invoices_table', 1),
(308, '2020_03_17_411909_alter_invocie_number_in_invoice_table', 1),
(309, '2020_03_19_112832_create_project_template_task_users_table', 1),
(310, '2020_03_20_2065158_insert_modules_setting_client_table', 1),
(311, '2020_03_23_185549_make_message_nullable_ticket_reply_table', 1),
(312, '2020_04_06_130331_create_discussion_categories_table', 1),
(313, '2020_04_06_132027_create_discussions_table', 1),
(314, '2020_04_06_133759_create_discussion_replies_table', 1),
(315, '2020_04_08_094325_add_best_answer_id_discussions_table', 1),
(316, '2020_04_08_125803_add_discussion_reply_email_notification_settings_table', 1),
(317, '2020_04_09_102411_add_last_reply_by_discussions_table', 1),
(318, '2020_04_12_2065158_insert_contract_employee_modules_setting_table', 1),
(319, '2020_04_14_144941_add_last_login_column_users_table', 1),
(320, '2020_04_20_083724_add_hourly_rate_project_timelogs', 1),
(321, '2020_04_20_114349_add_hourly_rate_project_members', 1),
(322, '2020_04_20_173833_add_project_id_value_for_tasks_timelogs', 1),
(323, '2020_04_23_124301_add_billable_column_tasks_table', 1),
(324, '2020_04_24_115049_add_approved_invoice_id_column_project_time_logs', 1),
(325, '2020_04_24_122510_add_approval_required_column_log_time_for', 1),
(326, '2020_05_13_070505_change_earning_by_minutes_timelogs', 1),
(327, '2020_05_13_113533_add_receipt_column_payments_table', 1),
(328, '2020_05_19_114539_add_custom_field_groups', 1),
(329, '2020_05_20_131017_change_project_team_id_cascade', 1),
(330, '2020_05_21_041143_create_social_auth_settings_table', 1),
(331, '2020_05_26_084027_add_column_expenses_table', 1),
(332, '2020_05_30_093624_add_send_status_column_invoices_table', 1),
(333, '2020_06_01_080620_add_send_status_column_estimates_table', 1),
(334, '2020_06_02_160923_add_email_notifications_column_users_table', 1),
(335, '2020_06_15_100530_create_task_tag_list_table', 1),
(336, '2020_06_15_116005_create_task_tags_table', 1),
(337, '2020_06_16_160933_alter_date_format_table', 1),
(338, '2020_06_20_030225_alter_task_tags_to_label_table', 1),
(339, '2020_06_26_131840_add_column_priority_column_leads_table', 1),
(340, '2020_06_29_141051_create_sessions_table', 1),
(341, '2020_07_06_171614_add_phone_country_code_column_users_table', 1),
(342, '2020_07_07_2065158_insert_module_setting_client_expense_payment_table', 1),
(343, '2020_07_08_2065258_enter_lead_status_id_table', 1),
(344, '2020_07_08_2931840_add_column_category_id_in_template_task_table', 1),
(345, '2020_07_15_112558_add_default_currency_projects', 1),
(346, '2020_07_16_583130_alter_dashboard_widgets_table', 1),
(347, '2020_07_21_583130_add_due_amount_column_in_invoice_table', 1),
(348, '2020_08_13_114705_set_task_category_id_column_null', 1),
(349, '2020_08_19_051839_create_employee_leave_quotas_table', 1),
(350, '2020_08_25_081839_add_columns_in_notices_table', 1),
(351, '2020_08_25_081839_alter_leads_value_table', 1),
(352, '2020_08_28_081839_add_columns_parent_in_invoice_table', 1),
(353, '2020_09_17_114705_set_credit_note_amount', 1),
(354, '2020_09_17_196005_create_task_notes_table', 1),
(355, '2020_09_18_104145_add_estimate_fields_tasks_table', 1),
(356, '2020_09_24_522646_create_expenses_category_table', 1),
(357, '2020_09_28_054230_create_expenses_recurring_table', 1),
(358, '2020_10_06_522646_create_product_category_table', 1),
(359, '2020_10_07_522646_create_pinned_table', 1),
(360, '2020_10_15_054230_create_invoice_recurring_table', 1),
(361, '2020_10_20_094043_add_dashboard_clock_column_organisation_setting_table', 1),
(362, '2020_10_29_111515_add_companylogo_address_column_in_contracts_table', 1),
(363, '2020_11_02_130413_create_contract_files_table', 1),
(364, '2020_11_17_115634_add_lead_custom_field_group', 1),
(365, '2020_11_18_065533_create_lead_custom_forms_table', 1),
(366, '2020_11_18_083624_add_city_state_to_client_details', 1),
(367, '2020_11_18_090244_add_city_state_to_leads_table', 1),
(368, '2020_11_19_063807_add_city_state_column_in_contracts_table', 1),
(369, '2020_11_19_091349_alter_country_cell_column_in_client_details', 1),
(370, '2020_11_20_104942_create_lead_category_table', 1),
(371, '2020_11_23_052427_add_category_id_column_in_leads_table', 1),
(372, '2020_11_25_114705_cancel_status_estimate', 1),
(373, '2020_11_27_092136_create_project_template_sub_tasks_table', 1),
(374, '2020_12_01_092136_create_notice_view_table', 1),
(375, '2020_12_02_055908_add_product_purchase_email_notification_setting_table', 1),
(376, '2020_12_03_065533_create_ticket_custom_forms_table', 1),
(377, '2020_12_04_114305_create_client_category_table', 1),
(378, '2020_12_08_075308_create_project_rating_table', 1),
(379, '2020_12_08_082101_add_paid_column_in_leave_types', 1),
(380, '2020_12_08_110140_add_paid_column_in_leaves_table', 1),
(381, '2020_12_21_072055_create_permission_types_table', 1),
(382, '2020_12_21_072058_create_user_permissions_table', 1),
(383, '2020_12_21_132255_add_user_permisisons', 1),
(384, '2020_12_22_071337_add_owned_by_added_by_last_updated_by_columns', 1),
(385, '2020_12_28_200000_add_two_factor_columns_to_users_table', 1),
(386, '2020_12_30_101513_add_owned_by_added_by_last_updated_by_columns_projects', 1),
(387, '2021_01_11_110041_add_owned_by_added_by_last_updated_by_columns_tasks', 1),
(388, '2021_01_18_084827_add_estimate_terms_column_invoice_settings', 1),
(389, '2021_01_19_060745_add_slug_new_product_purchase_in_email_notification_table', 1),
(390, '2021_01_29_152503_lead_custom_field_name_change', 1),
(391, '2021_02_05_055908_add_lead_proposal_email_setting', 1),
(392, '2021_02_05_114041_create_user_taskboard_settings_table', 1),
(393, '2021_02_08_115655_create_proposal_signs_table', 1),
(394, '2021_02_15_085425_modify_status_column_in_projects_table', 1),
(395, '2021_02_15_135533_alter_lead_custom_forms_table', 1),
(396, '2021_02_16_082106_add_mobile_column_in_tickets_table', 1),
(397, '2021_02_16_100313_add_added_by_last_updated_by_columns_to_events_table', 1),
(398, '2021_02_16_102604_add_added_by_last_updated_by_columns_to_products_table', 1),
(399, '2021_02_16_102906_add_added_by_last_updated_by_columns_to_notices_table', 1),
(400, '2021_02_17_122943_change_client_details_foreign_table', 1),
(401, '2021_02_19_102125_add_salutation_column_to_leads_table', 1),
(402, '2021_02_20_185545_add_owned_by_added_by_last_updated_by_columns_invoices', 1),
(403, '2021_02_22_101316_add_owned_by_added_by_last_updated_by_columns_payments', 1),
(404, '2021_02_23_173243_add_column_length_column', 1),
(405, '2021_02_24_084749_add_owned_by_added_by_last_updated_by_columns_estimates', 1),
(406, '2021_02_25_052941_add_owned_by_added_by_last_updated_by_columns_leads', 1),
(407, '2021_02_26_092320_create_currency_format_settings_table', 1),
(408, '2021_02_26_092817_add_sac_code_invoice_table', 1),
(409, '2021_02_27_070155_add_added_by_last_updated_by_columns_to_leaves_table', 1),
(410, '2021_02_28_095653_add_owned_by_added_by_last_updated_by_columns_expenses', 1),
(411, '2021_03_01_133056_create_user_leadboard_settings_table', 1),
(412, '2021_03_03_071758_add_owned_by_added_by_last_updated_by_columns_tinelogs', 1),
(413, '2021_03_03_130641_add_moment_format_column_settings_table', 1),
(414, '2021_03_04_060745_add_new_for_null_slug_email_notification_table', 1),
(415, '2021_03_08_022302_add_added_by_last_updated_by_columns_to_holidays_table', 1),
(416, '2021_03_09_123344_add_owned_by_added_by_last_updated_by_columns_contracts', 1),
(417, '2021_03_11_070400_update_contract_type_cascade', 1),
(418, '2021_03_15_112622_add_owned_by_added_by_last_updated_by_columns_attendance', 1),
(419, '2021_03_15_145533_add_last_cron_run_in_organisation_settings_table', 1),
(420, '2021_03_19_091501_add_favicon_in_organisation_settings_table', 1),
(421, '2021_03_19_123557_add_owned_by_added_by_last_updated_by_columns_tickets', 1),
(422, '2021_04_06_111105_sync_default_role_permission', 1),
(423, '2021_04_08_021853_add_owned_by_added_by_last_updated_by_columns_invoice_recurring', 1),
(424, '2021_04_14_080502_add_decription_column_in_proposals_table', 1),
(425, '2021_05_01_220324_add_dashboard_permissions', 1),
(426, '2021_05_03_055859_add_owned_by_added_by_last_updated_by_columns_credit_notes_table', 1),
(427, '2021_05_17_133302_reset_theme_default_colors', 1),
(428, '2021_05_26_102905_craete_client_notes_table', 1),
(429, '2021_05_30_174638_craete_project_notes_table', 1),
(430, '2021_05_31_050747_add_send_reminder_in_invoice_setting_table', 1),
(431, '2021_05_31_102117_task_share_unique_hash', 1),
(432, '2021_06_03_104606_add_owned_by_added_by_last_updated_by_columns_project_ratings', 1),
(433, '2021_06_07_132858_create_user_invitations_table', 1),
(434, '2021_06_08_072201_add_close_date_in_ticket_table', 1),
(435, '2021_06_09_101110_remove_visible_rating_employee_column_from_projects_table', 1),
(436, '2021_06_16_185748_add_dark_theme_column_users_table', 1),
(437, '2021_06_24_185748_add_column_payment_gateway_credentials_table', 1),
(438, '2021_06_29_104606_add_manage_project_template_permission', 1),
(439, '2021_07_07_093528_alter_userid_on_project_template_member', 1),
(440, '2021_07_20_102117_invoice_client_fix', 1),
(441, '2021_07_23_181545_add_status_column_to_slack_settings_table', 1),
(442, '2021_07_25_041851_add_report_permissions', 1),
(443, '2021_08_04_171200_add_mail_connection_column_email_settings', 1),
(444, '2021_08_06_085318_remove_on_delete_cascade_from_category_id_on_products_table', 1),
(445, '2021_08_10_081641_change_default_value_of_paypal_and_stripe_on_payment_gateway_credentials_table', 1),
(446, '2021_08_10_092728_add_allowed_permission_column_permissions_table', 1),
(447, '2021_08_10_092728_alter_allowed_permission_column_permissions_table', 1),
(448, '2021_08_13_094921_change_notification_notifications_table', 1),
(449, '2021_08_16_161256_set_discussion_category_id_null_on_category_delete', 1),
(450, '2021_08_17_095756_change_details_columns_type_to_longtext_on_client_note_and_project_note_tables', 1),
(451, '2021_08_19_174641_change_text_longtext', 1),
(452, '2021_08_20_100009_change_hourly_rate_double', 1),
(453, '2021_08_20_121027_add_dashboard_module_permission', 1),
(454, '2021_08_23_125630_create_orders_table', 1),
(455, '2021_08_26_120755_add_order_id_column_to_payments_table', 1),
(456, '2021_08_27_100840_add_order_id_to_invoices_table', 1),
(457, '2021_08_31_071303_add_failed_status_on_payments_table', 1),
(458, '2021_09_01_124609_add_order_module_and_permissions', 1),
(459, '2021_09_02_080343_add_hash_columns', 1),
(460, '2021_09_02_182736_add_notice_module_clients', 1),
(461, '2021_09_03_182020_add_default_permissions', 1),
(462, '2021_09_06_182020_change_dashboard_widget_name', 1),
(463, '2021_09_07_084452_delete_notices_module_from_client', 1),
(464, '2021_09_08_142150_add_payment_gateway_response_column_to_payment_table', 1),
(465, '2021_09_09_085024_add_taskboard_message_pusher_settings', 1),
(466, '2021_09_14_162221_add_payload_id_to_payments_table', 1),
(467, '2021_09_15_072728_copy_credit_notes_invoice_table_data_to_payments_table', 1),
(468, '2021_09_15_190915_add_column_calculate_tax', 1),
(469, '2021_09_17_115037_remove_credit_notes_invoice_table', 1),
(470, '2021_09_20_095509_alter_and_add_payment_gateways_credentials', 1),
(471, '2021_09_22_045939_change_subtask_in_notifications_table', 1),
(472, '2021_09_22_085009_change_google_recaptcha_columns_in_organisation_settings_table', 1),
(473, '2021_09_24_083220_add_currency_id_to_contracts_table', 1),
(474, '2021_09_24_100722_add_view_hourly_rate_permission', 1),
(475, '2021_09_29_071418_add_salutation_column_on_users_table', 1),
(476, '2021_09_29_075245_add_lead_status_change_permission', 1),
(477, '2021_09_30_130413_attendance_setting_alert', 1),
(478, '2021_10_01_074809_add_leave_change_permission', 1),
(479, '2021_10_03_190531_add_sidebar_logo_style_column_global_settings', 1),
(480, '2021_10_04_045942_add_2fa_columns_on_users_table', 1),
(481, '2021_10_04_130413_create_expenses_category_roles_table', 1),
(482, '2021_10_05_064140_change_date_null_in_task_table', 1),
(483, '2021_10_05_130413_custom_field_group_change_table', 1),
(484, '2021_10_06_130413_create_sub_task_files_table', 1),
(485, '2021_10_11_092617_add_session_driver_column_organisation_settings', 1),
(486, '2021_10_12_062814_change_authenticate_via_column', 1),
(487, '2021_10_12_073058_make_email_nullable_users_table', 1),
(488, '2021_10_12_121613_add_approve_reject_leaves_permissions', 1),
(489, '2021_10_13_103621_add_client_signup_columns_settings_table', 1),
(490, '2021_10_14_073904_add_admin_approval_column_users_table', 1),
(491, '2021_10_16_113306_add_two_factor_confirmed_column_users_table', 1),
(492, '2021_10_18_131815_allow_gender_null', 1),
(493, '2021_10_21_104332_add_employee_owned_permissions', 1),
(494, '2021_10_26_175349_change_ticket_permissions', 1),
(495, '2021_10_28_120427_add_recurring_columns_tasks', 1),
(496, '2021_11_11_145726_add_allowed_file_types_column', 1),
(497, '2021_11_13_063519_add_paystack_to_payment_gateway_credentials', 1),
(498, '2021_11_16_105840_change_product_sub_cat_relation', 1),
(499, '2021_11_17_111317_add_mollie_to_payment_gateway_credentials', 1),
(500, '2021_11_17_173210_create_company_addresses_table', 1),
(501, '2021_11_18_053337_add_tax_calculation_msg_to_invoice_settings_table', 1),
(502, '2021_11_19_115843_add_project_type_column_projects', 1),
(503, '2021_11_22_114532_move_gst_to_compane_address', 1),
(504, '2021_11_24_093356_add_payfast_to_payment_gateway_credentials', 1),
(505, '2021_11_24_093619_create_invoice_item_images_table', 1),
(506, '2021_11_25_134531_fix_timelog_time', 1),
(507, '2021_11_26_063416_add_authorize_to_payment_gateway_credentials', 1),
(508, '2021_11_29_060348_create_discussion_files_table', 1),
(509, '2021_11_30_063441_add_square_to_payment_gateway_credentials', 1),
(510, '2021_12_08_100451_add_image_column_to_products_table', 1),
(511, '2021_12_10_112406_add_permission_sync_column_users_table', 1),
(512, '2021_12_13_070928_add_proposal_items_images_table', 1),
(513, '2021_12_14_112039_add_location_column_company_addresses', 1),
(514, '2021_12_15_090905_create_recurring_invoice_item_images_table', 1),
(515, '2021_12_15_112911_add_recurring_expense_permission', 1),
(516, '2021_12_17_041814_create_job_batches_table', 1),
(517, '2021_12_20_053945_add_order_item_image_table', 1),
(518, '2021_12_21_044934_add_google_event_id_to_several_tables', 1),
(519, '2021_12_21_064709_add_title_field_in_client_contact_table', 1),
(520, '2021_12_21_121710_create_google_calendar_modules_table', 1),
(521, '2021_12_23_102347_change_clock_out_ip_make_nullable_to_attendances_table', 1),
(522, '2021_12_24_045226_add_paystack_mode_to_payment_gateway_credentials', 1),
(523, '2021_12_24_085109_add_save_location_column_attendance_settings', 1),
(524, '2021_12_27_065645_create_knowledgebase_categories_table', 1),
(525, '2021_12_27_090829_create_knowledge_bases_table', 1),
(526, '2021_12_28_112808_add_module_knowledgebase_and_permissions', 1),
(527, '2021_12_29_124232_add_lead_notes_table', 1),
(528, '2021_12_30_082542_add_added_by_column_knowledge_base_table', 1),
(529, '2022_01_03_090136_add_downloadable_to_products_table', 1),
(530, '2022_01_03_103014_create_database_backup_settings_table', 1),
(531, '2022_01_03_125020_add_product_id_to_order_items_table', 1),
(532, '2022_01_06_053854_set_product_description_to_nullable_in_products_table', 1),
(533, '2022_01_06_093627_add_default_permission_to_knowledge_bases_table', 1),
(534, '2022_01_11_104355_create_translate_settings_table', 1),
(535, '2022_01_13_080729_add_flutterwave_to_payment_gateway_credentials', 1),
(536, '2022_01_14_122713_add_change_role_permission', 1),
(537, '2022_01_15_055907_create_product_files_table', 1),
(538, '2022_01_19_112914_create_client_docs_table', 1),
(539, '2022_01_31_090302_add_missing_permissions_to_admin_role', 1),
(540, '2022_01_31_111358_change_reference_column_to_lead_notes_table', 1),
(541, '2022_02_01_104951_add_role_permissions_settings_permission', 1),
(542, '2022_02_01_113853_fix_permission_types', 1),
(543, '2022_02_03_065848_add_order_notification_to_email_notification_settings_table', 1),
(544, '2022_02_03_095618_change_quantity_type_in_order_items_table', 1),
(545, '2022_02_06_150726_add_product_custom_field_group', 1),
(546, '2022_02_07_175605_create_project_time_log_breaks_table', 1),
(547, '2022_02_09_084910_add_two_columns_in_sub_tasks_table', 1),
(548, '2022_02_10_083543_add_description_column_to_estimates_table', 1),
(549, '2022_02_11_182041_change_discussion_category_permission', 1),
(550, '2022_02_14_061344_add_birth_date_in_employee_detail_table', 1),
(551, '2022_02_14_101407_add_data_in_dashboard_widgets_table', 1),
(552, '2022_02_14_133011_remove_edit_project_file_permission', 1),
(553, '2022_02_14_180229_make_lead_email_nullable', 1),
(554, '2022_02_15_111216_update_notice_permissions', 1),
(555, '2022_02_15_151924_remove_product_file_permission', 1),
(556, '2022_02_16_063017_add_user_notification_to_email_notification_settings_table', 1),
(557, '2022_02_16_072041_remove_lead_file_permission', 1),
(558, '2022_02_16_173650_add_english_language', 1),
(559, '2022_02_17_083521_update_order_status_to_orders_table', 1),
(560, '2022_02_18_102942_create_emergency_contacts_table', 1),
(561, '2022_02_21_061830_add_emergency_contact_module_and_permission', 1),
(562, '2022_02_22_170153_add_item_summary_column_credit_note', 1),
(563, '2022_02_24_070325_add_allowed_file_size_global', 1),
(564, '2022_02_25_095712_add_discout_to_orders_table', 1),
(565, '2022_03_01_173825_add_approve_expense_permission', 1),
(566, '2022_03_03_024807_modify_signature_column_on_proposal_signs_table', 1),
(567, '2022_03_04_055054_add_few_fields_in_lead_follow_up_table', 1),
(568, '2022_03_07_053249_add_flutterwave_webhook_secret_hash_to_payment_gateway_credentials_table', 1),
(569, '2022_03_08_063640_add_added_by_and_updated_by_columns_to_ticket_agent_groups_table', 1),
(570, '2022_03_09_060457_add_several_fields_to_lead_custom_forms_table', 1),
(571, '2022_03_10_094321_add_unassigned_task_permission', 1),
(572, '2022_03_15_104220_add_several_fields_to_invoice_settings_table', 1),
(573, '2022_03_16_060139_add_missing_hash_in_invoices_table', 1),
(574, '2022_03_16_093939_change_chat_length', 1),
(575, '2022_03_22_101553_remove_html_tags_in_products', 1),
(576, '2022_03_28_081634_create_ticket_email_settings_table', 1),
(577, '2022_03_30_075758_add_imap_columns_tickets_table', 1),
(578, '2022_04_06_050532_create_files_table', 1),
(579, '2022_04_11_094350_add_company_address_id_to_orders_table', 1),
(580, '2022_04_20_173756_change_milestone_cost_limit', 1),
(581, '2022_04_21_074927_add_currency_key_version_column', 1),
(582, '2022_04_22_054036_add_view_earning_permission_timelogs', 1),
(583, '2022_04_22_102709_create_employee_shifts_table', 1),
(584, '2022_04_25_085447_ad_missing_admin_permissions', 1),
(585, '2022_05_03_180927_add_soft_delete_tax', 1),
(586, '2022_05_04_060741_fix_delete_cacade_recur_invoice', 1),
(587, '2022_05_06_065647_create_employee_shift_change_requests_table', 1),
(588, '2022_05_06_100620_add_location_column_in_attendance', 1),
(589, '2022_05_17_095236_add_show_clock_in_button_in_attendace_table', 1),
(590, '2022_05_23_062159_add_project_show_in_invoice_setting_table', 1),
(591, '2022_05_25_064410_add_column_employee_details_table', 1),
(592, '2022_05_25_072526_add_custom_fields_id_to_lead_custom_form_table', 1),
(593, '2022_05_27_002220_add_custom_fields_id_to_ticket_custom_form_table', 1),
(594, '2022_05_31_070019_add_ticket_to_custom_field_groups', 1),
(595, '2022_06_09_114831_add_view_shift_roster_permission', 1),
(596, '2022_06_13_084344_add_google_calender_status_to_users_table', 1),
(597, '2022_06_20_102221_add_private_dashboard_type_to_dashboard_widgets_table', 1),
(598, '2022_06_20_102234_add_date_in_project_milestones_table', 1),
(599, '2022_06_20_202945_add_shift_time_columns_attendance_table', 1),
(600, '2022_06_21_051915_add_reminder_and_send_reminder_after_column_to_invoice_settings_table', 1),
(601, '2022_06_22_072625_add_shift_time_columns_employee_shift_schedule_table', 1),
(602, '2022_06_23_124453_add_default_status_in_calendar_view_employee_details_table', 1),
(603, '2022_06_24_084953_add_project_id_column_to_task_label_list', 1),
(604, '2022_06_28_045956_add_column_to_message_setting_table', 1),
(605, '2022_07_01_063756_add_app_name_column_organisation_settings_table', 1),
(606, '2022_07_01_111241_add_parent_id_column_to_teams', 1),
(607, '2022_07_04_092625_change_date_format_in_organization_setting_table', 1),
(608, '2022_07_11_051015_add_timelog_to_cutom_field_groups', 1),
(609, '2022_07_13_115914_add_remark_column_shift', 1),
(610, '2022_07_13_191406_add_custom_invoice_number_column_invoices', 1),
(611, '2022_07_14_203040_remove_dashboards_employee_type', 1),
(612, '2022_07_19_144705_add_week_timelog_widget_setting_private_dashboard', 1),
(613, '2022_07_22_073943_update_settings_add_license_type', 1),
(614, '2022_07_24_115433_add_expense_report_permission', 1),
(615, '2022_07_25_122923_add_task_soft_delete', 1),
(616, '2022_07_25_141508_add_today_attendance_widget_hr_dashbaord', 1),
(617, '2022_07_28_043824_add_export_column_custom_fields_table', 1),
(618, '2022_07_28_175448_create_knowledge_base_files_table', 1),
(619, '2022_07_29_101111_add_indexes_to_table_columns', 1),
(620, '2022_08_01_104602_add_columns_to_employee_details', 1),
(621, '2022_08_02_113623_add_external_link_column_knowledge_base_files_table', 1),
(622, '2022_08_02_121434_add_timestamps_knowledge_base_files_table', 1),
(623, '2022_08_03_103344_add_auto_clock_in_column_to_attendance_settings_table', 1),
(624, '2022_08_04_075744_add_approved_columns_on_leaves', 1),
(625, '2022_08_04_122512_add_columns_in_leave_types', 1),
(626, '2022_08_04_184937_add_half_day_type_in_leaves_table', 1),
(627, '2018_01_01_000000_create_worksuite_new_table', 1),
(628, '2022_07_04_111754_add_project_short_code_column_project_table', 2),
(629, '2022_07_14_063826_contract_templates', 2),
(630, '2022_07_22_042424_create_proposal_templates_table', 2),
(631, '2022_08_03_101616_create_event_files_table', 2),
(632, '2022_08_12_000000_create_other_migration_till_date_table', 2),
(633, '2022_08_13_070443_add_task_unique_id_column_tasks_table', 2),
(634, '2022_08_18_120924_create_task_settings_table', 2),
(635, '2022_08_19_100314_add_leave_widget_in_dashboard_widget_table', 2),
(636, '2022_08_19_115209_create_project_status_settings_table', 2),
(637, '2022_08_22_104028_knowledge_heading_missing', 2),
(638, '2022_08_23_065943_change_status_type_projects_table', 2),
(639, '2022_08_24_122345_add_lead_widget_in_dashboard_widget_table', 2),
(640, '2022_08_25_085025_add_other_location_to_attendances_table', 2),
(641, '2022_08_25_123713_add_work_from_home_widget_in_dashboard_widgets_table', 2),
(642, '2022_08_26_042542_remove_on_delete_cascade_from_invoice_recurring_id_to_invoices', 2),
(643, '2022_08_26_053139_add_parent_id_column_designation_table', 2),
(644, '2022_08_29_064339_add_added_by_to_project_template', 2),
(645, '2022_08_29_103443_add_flag_code_column_to_language_settings', 2),
(646, '2022_09_02_151515_create_flags_table', 2),
(648, '2022_09_20_042618_create_contract_custom_forms_table', 3),
(652, '2022_09_21_095840_create_deals_table', 4),
(654, '2022_09_22_065040_create_p_m_projects_table', 5),
(655, '2022_09_22_073037_create_p_m_assigns_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(10) UNSIGNED NOT NULL,
  `module_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `module_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'clients', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(2, 'employees', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(3, 'projects', 'User can view the basic details of projects assigned to him even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(4, 'attendance', 'User can view his own attendance even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(5, 'tasks', 'User can view the tasks assigned to him even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(6, 'estimates', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(7, 'invoices', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(8, 'payments', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(9, 'timelogs', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(10, 'tickets', 'User can view the tickets generated by him as default even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(11, 'events', 'User can view the events to be attended by him as default even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(12, 'notices', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(13, 'leaves', 'User can view the leaves applied by him as default even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(14, 'leads', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(15, 'holidays', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(16, 'products', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(17, 'expenses', 'User can view and add(self expenses) the expenses as default even without any permission.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(18, 'contracts', 'User can view all contracts', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(19, 'reports', 'User can manage permission of particular report', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(20, 'settings', 'User can manage settings', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(21, 'dashboards', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(22, 'orders', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(23, 'knowledgebase', NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `module_settings`
--

CREATE TABLE `module_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `module_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('admin','employee','client') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `module_settings`
--

INSERT INTO `module_settings` (`id`, `module_name`, `status`, `type`, `created_at`, `updated_at`) VALUES
(1, 'projects', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(2, 'messages', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(3, 'notices', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(4, 'leads', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(5, 'invoices', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(6, 'projects', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(7, 'clients', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(8, 'projects', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(9, 'tickets', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(10, 'invoices', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(11, 'estimates', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(12, 'events', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(13, 'messages', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(14, 'tasks', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(15, 'timelogs', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(16, 'contracts', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(17, 'notices', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(18, 'payments', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(19, 'orders', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(20, 'knowledgebase', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(21, 'employees', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(22, 'attendance', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(23, 'expenses', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(24, 'leaves', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(25, 'leads', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(26, 'holidays', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(27, 'products', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(28, 'reports', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(29, 'settings', 'active', 'admin', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(30, 'clients', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(31, 'projects', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(32, 'tickets', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(33, 'invoices', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(34, 'estimates', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(35, 'events', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(36, 'messages', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(37, 'tasks', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(38, 'timelogs', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(39, 'contracts', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(40, 'notices', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(41, 'payments', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(42, 'orders', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(43, 'knowledgebase', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(44, 'employees', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(45, 'attendance', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(46, 'expenses', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(47, 'leaves', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(48, 'leads', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(49, 'holidays', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(50, 'products', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(51, 'reports', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(52, 'settings', 'active', 'employee', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(53, 'clients', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(54, 'projects', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(55, 'tickets', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(56, 'invoices', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(57, 'estimates', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(58, 'events', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(59, 'messages', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(60, 'tasks', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(61, 'timelogs', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(62, 'contracts', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(63, 'notices', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(64, 'payments', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(65, 'orders', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(66, 'knowledgebase', 'active', 'client', '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(10) UNSIGNED NOT NULL,
  `to` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notice_views`
--

CREATE TABLE `notice_views` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `notice_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('03c7858e-f042-4151-8f46-c1606bd23ca4', 'App\\Notifications\\NewProjectMember', 'App\\Models\\User', 10, '{\"member_id\":4,\"project_id\":2,\"project\":\"sdasdasd\"}', NULL, '2022-09-21 23:37:58', '2022-09-21 23:37:58'),
('17f5c547-50e2-46bb-a97e-c7334c9c5226', 'App\\Notifications\\LeadAgentAssigned', 'App\\Models\\User', 10, '{\"id\":1,\"name\":\"Freealancing Client\",\"agent_id\":10,\"added_by\":1}', NULL, '2022-09-21 20:10:18', '2022-09-21 20:10:18'),
('1ae20a80-8528-44a1-8529-b2d39309658c', 'App\\Notifications\\NewUser', 'App\\Models\\User', 15, '{\"id\":15,\"name\":\"Pm5\",\"email\":\"pm@gmail.com\",\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":\"01575202020\",\"gender\":\"male\",\"salutation\":null,\"locale\":\"en\",\"status\":\"active\",\"login\":\"enable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":18,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41c7c07b59de9c8004733235e7d073b.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[],\"client_details\":null,\"session\":null,\"employee_detail\":null}', NULL, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
('1c4c19c2-c051-4e3b-ad70-74c161dd84fb', 'App\\Notifications\\NewProjectMember', 'App\\Models\\User', 10, '{\"member_id\":1,\"project_id\":1,\"project\":\"sadfsdsdg\"}', NULL, '2022-09-21 05:08:21', '2022-09-21 05:08:21'),
('22ce8bac-e440-4144-8888-39a9976957cc', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":28,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"ce3iE9Sht0E40YctqE9PpCHGnidjvqTh\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:08:48', '2022-09-20 00:08:48'),
('274bd333-6f65-422c-9d69-f9db1cb462b1', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":37,\"client_id\":14,\"subject\":\"sdasdas\",\"amount\":\"50\",\"original_amount\":\"50.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>asdsafdsgdf<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"fPkAci8EfbSUW6AugukEUBY22hjXU8Bn\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:20:19', '2022-09-20 02:20:19'),
('2d565c86-7967-4cda-a08e-6d8757e0185f', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":26,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"quyU36Ue8Xum1s5gnG8bXD7izWec1vPU\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:05:06', '2022-09-20 00:05:06'),
('2e94911a-ecf9-47cb-9126-9c5cadd3811c', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":13,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"ZbZR7uNKLGuFqixXmXtydboAW2Fehx0y\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:40:06', '2022-09-19 23:40:06'),
('2ef59f27-e188-43e3-aed7-4463d00213a8', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":15,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"ssQ6TprPJ8ASNXYbb7MGdnfnWTUvzMjq\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:42:39', '2022-09-19 23:42:39'),
('2f1ac11f-cbff-4c29-84f4-c67faaac1411', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":18,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"v1ePbAydv9e5DuRbGwuEtH2pjxsTucP2\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:46:52', '2022-09-19 23:46:52'),
('342313f2-211c-4379-a61f-f172bb1dc845', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":16,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"LkrYQVPQiKd8cQdc8p3NAJIXyRMHHgZa\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:43:08', '2022-09-19 23:43:08'),
('3a96d08f-f1c7-46ee-a437-b40a17e2d9e6', 'App\\Notifications\\NewUser', 'App\\Models\\User', 16, '{\"id\":16,\"name\":\"pm6\",\"email\":\"pm6@gmail.com\",\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":\"01575202020\",\"gender\":\"male\",\"salutation\":null,\"locale\":\"en\",\"status\":\"active\",\"login\":\"enable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":18,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/e050b0759684571240527c01699bde6d.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[],\"client_details\":null,\"session\":null,\"employee_detail\":null}', NULL, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
('3c030886-3532-4eb5-a5fd-199a0da9ff2d', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":36,\"client_id\":13,\"subject\":\"asdasdas\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>saddasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"Zwb2t6RyNHMd19dFaeRmvz1EEfXTzaHa\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:18:10', '2022-09-20 02:18:10'),
('40b8be7d-7ad6-49fa-94de-747245fc500b', 'App\\Notifications\\NewProjectMember', 'App\\Models\\User', 11, '{\"member_id\":4,\"project_id\":2,\"project\":\"sdasdasd\"}', NULL, '2022-09-21 23:37:58', '2022-09-21 23:37:58'),
('4ecc6dcc-40f3-4292-8193-f591864f5c6b', 'App\\Notifications\\NewUser', 'App\\Models\\User', 10, '{\"id\":10,\"name\":\"Pm2\",\"email\":\"pm2@gmail.com\",\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":\"01575202028\",\"gender\":\"male\",\"salutation\":null,\"locale\":\"en\",\"status\":\"active\",\"login\":\"enable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":18,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/83dc8ee6f853e409b3c1f997a9eaac2c.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[],\"client_details\":null,\"session\":null,\"employee_detail\":null}', NULL, '2022-09-19 01:50:49', '2022-09-19 01:50:49'),
('51552b64-89fa-46af-87d9-15798252e287', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":21,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"WtWr9OqjKnS3FxUpH59NUIcPJ9c3j20S\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:56:03', '2022-09-19 23:56:03'),
('536af4ca-c49d-4669-ad65-f16cfce79ccb', 'App\\Notifications\\NewUser', 'App\\Models\\User', 9, '{\"id\":9,\"name\":\"John Doe\",\"email\":\"pm1@gmail.com\",\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":\"01575202020\",\"gender\":\"male\",\"salutation\":null,\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":18,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/05e6cc043d5b0fb4fb44d0f8a9efdb33.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[],\"client_details\":null,\"session\":null,\"employee_detail\":null}', NULL, '2022-09-19 00:44:40', '2022-09-19 00:44:40'),
('53e8bec1-8702-47f7-a912-c2099418d204', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":45,\"client_id\":13,\"subject\":\"sadasd\",\"amount\":\"50\",\"original_amount\":\"50.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"7eJyQjcwZwgV1oxzrd7OtzWNcqyZf4hI\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:54:15', '2022-09-20 02:54:15'),
('5d045c6e-b3c9-47e3-b464-96e69d08944d', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":3,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"bDA7Osatmrt82Od38Diyrbqc5N08urRl\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:34:24', '2022-09-19 23:34:24'),
('5e742e2f-6e04-408c-81b9-f3ed24d4e328', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":23,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"5bccBCGSzMudN2R9W5hnLcle8wcjQdEb\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:03:12', '2022-09-20 00:03:12'),
('5e7f2662-7f4b-4f5f-8788-52e17264d477', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":31,\"client_id\":14,\"subject\":\"test\",\"amount\":\"50\",\"original_amount\":\"50.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dsadasd<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"DwqmQovTrp2dECTIGnmya26pmpRe097M\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:17:29', '2022-09-20 00:17:29'),
('5f469152-e1cf-42e6-b0ea-41f9bde4809b', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":29,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"AJPtVSbpSk9CcoKt6cEYN0rzvq4jBhAG\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:16:56', '2022-09-20 00:16:56'),
('64172712-28b3-4b18-b101-ca85f098038c', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":7,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"cr2u09yjhJRf8F34GM7dBYBkDKzap6PQ\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:36:38', '2022-09-19 23:36:38'),
('6a50284a-8b66-4194-89ad-cae7683aad0d', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":5,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"sNndnGJ8ZvW96sCV4AkHKMeHOTl5ysrL\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:36:16', '2022-09-19 23:36:16'),
('8528b5a4-a986-4f46-b96d-48a021db9d98', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":14,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"bYhQ1eYn5ou43Ftk8L7JRdtDcM66CG8u\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:40:23', '2022-09-19 23:40:23');
INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('8b775f0c-9e33-419b-86c0-c55aa78862b3', 'App\\Notifications\\NewProjectMember', 'App\\Models\\User', 12, '{\"member_id\":1,\"project_id\":1,\"project\":\"sadfsdsdg\"}', NULL, '2022-09-21 05:08:22', '2022-09-21 05:08:22'),
('8cf9141a-7ef1-4eb2-9133-298ce265c41b', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":9,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"XhLAhojAlsCW3DmJcz76x1ku7Zt2F49r\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:38:54', '2022-09-19 23:38:54'),
('8ec1be89-036d-4535-af83-0ff1536e8f1f', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":4,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"0QX2GyngDv9nRmmdHkKLbtzk0OJZiw00\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:34:52', '2022-09-19 23:34:52'),
('916d794a-16f2-41e2-9dd1-a4695c6281d5', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":19,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"F7fCH4T0j3xXyinXJZfllLWYyY2xoYVS\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:47:14', '2022-09-19 23:47:14'),
('930292db-84e8-4b02-8d63-6f22104e2328', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":40,\"client_id\":14,\"subject\":\"dasds\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dsadasd<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"GQSPGVmtCHqh2ePlDeg8adxB02zCvw8N\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:24:17', '2022-09-20 02:24:17'),
('9316ab8d-ddbf-46ad-a9f5-3ad593742f68', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":30,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"iOOEIM3unQqSPSa6KzZlrJCWE9x4JzYZ\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:17:01', '2022-09-20 00:17:01'),
('96cc869f-9217-4616-a848-2e0f01684376', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":39,\"client_id\":14,\"subject\":\"sdasdfas\",\"amount\":\"50\",\"original_amount\":\"50.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"7IAP9npDPFXV88Mj4biXq5TwGcN4xMHV\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:22:36', '2022-09-20 02:22:36'),
('9f361617-2c20-45bb-945a-51e3b67ad2a8', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":24,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"ocUsaCcKRfUEnvPwMKM7MU4IiJcRAwhT\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:03:20', '2022-09-20 00:03:20'),
('a0a8d170-846b-4515-a209-7ecf5e23f3ae', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":10,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"bpJiROwfCyhucmNegLuKQSgDutuaLWeq\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:39:02', '2022-09-19 23:39:02'),
('a2baa812-3afb-4035-bd59-eb169831a333', 'App\\Notifications\\NewUser', 'App\\Models\\User', 11, '{\"id\":11,\"name\":\"pm3\",\"email\":\"pm3@gmail.com\",\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":\"01575202020\",\"gender\":\"male\",\"salutation\":null,\"locale\":\"en\",\"status\":\"active\",\"login\":\"enable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":18,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/c6f2f1031e828fe5d7269958e1195214.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[],\"client_details\":null,\"session\":null,\"employee_detail\":null}', NULL, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
('a3ebcc27-8dee-48fa-8a44-be9e4ae65ae4', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":11,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"GfDQVlTTbtKSS6K7MuHmjWMS2Yjj6rQ8\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:39:35', '2022-09-19 23:39:35'),
('a464eac4-18f9-4632-bc72-3c2e210159b2', 'App\\Notifications\\NewProjectMember', 'App\\Models\\User', 12, '{\"member_id\":4,\"project_id\":2,\"project\":\"sdasdasd\"}', NULL, '2022-09-21 23:37:58', '2022-09-21 23:37:58'),
('ac86ba0e-ebc3-4f85-9f32-7dcc8b29d1b6', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":34,\"client_id\":13,\"subject\":\"asdasdas\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>saddasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"E8PbuymJgWLDXxyUwCqQYqgNaTxWASqM\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:11:27', '2022-09-20 02:11:27'),
('af1ae734-ce9d-4b02-8cb2-2696c1082d86', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":38,\"client_id\":13,\"subject\":\"sdasdas\",\"amount\":\"520\",\"original_amount\":\"520.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"H4MXoqiLGgGJRXqY7xPPEchdoaEYLGD3\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:21:15', '2022-09-20 02:21:15'),
('af81fd6b-328a-468a-b149-bb68ad7bb87a', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":20,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"Q2HoOfxc15wOZ4F3MCWTLpjoSyNn66Hy\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:55:51', '2022-09-19 23:55:51'),
('b5e5ca5a-4787-4d3c-9052-13756f54c8cc', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":6,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"25tt7os2e1UK7ddibTaQtG42mxPr67bM\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:36:20', '2022-09-19 23:36:20'),
('bdbbd0a7-e8e3-4447-a6f6-56566dd7b8ea', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":27,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"xyufHzLgOdQwpeKRMvlnSa09sAx9ybPY\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:06:46', '2022-09-20 00:06:46'),
('c7213c3f-0364-4d7d-a991-9e2c1ba27186', 'App\\Notifications\\NewUser', 'App\\Models\\User', 12, '{\"id\":12,\"name\":\"pm4\",\"email\":\"pm4@gmail.com\",\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":\"01575202020\",\"gender\":\"male\",\"salutation\":null,\"locale\":\"en\",\"status\":\"active\",\"login\":\"enable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":18,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/2271f213f62ab9eb7749d5c09ffbb087.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[],\"client_details\":null,\"session\":null,\"employee_detail\":null}', NULL, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
('c8102827-824a-4fe3-9f21-effab43c62a0', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":8,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"ZgCt0xJZLjXqd9Ww2DzhQS8UxKYaJ7Ip\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:36:50', '2022-09-19 23:36:50'),
('cd291c78-3efe-4af0-a06c-be418476fd48', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":25,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"MfFufEqoUpnfFP9WTHhV8o5w11NTgTKJ\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:04:33', '2022-09-20 00:04:33'),
('d1057070-215a-405e-ab25-59897a01e0ef', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":17,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"arfmQvKH8Pq0qqKVNx1GBE6ejJeC74GA\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:43:29', '2022-09-19 23:43:29'),
('d461007d-7be5-490f-9de2-4b8795f56a73', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":33,\"client_id\":13,\"subject\":\"sfdasdas\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"GXUfaDbAqPwBfudk3WQnjr0DbNy5N1O5\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:35:34', '2022-09-20 00:35:34');
INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('de72a83b-d45f-49d4-ba19-147edb0ca323', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":43,\"client_id\":14,\"subject\":\"sdasdasd\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"Fy3UYEq5XBu0OFFz7MXcyLOaiU8UKtab\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:31:30', '2022-09-20 02:31:30'),
('df7a4e9c-79fd-4d1e-8101-0f446e4d7e68', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":32,\"client_id\":14,\"subject\":\"test\",\"amount\":\"50\",\"original_amount\":\"50.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dsadasd<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"dUKsMfwtVfziwEynuN83cCl5nZhfuch6\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:28:14', '2022-09-20 00:28:14'),
('e74c4438-da51-4135-9406-dbf4868ff829', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":12,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"W5z8GYtAJmbw8l5NyXkGvIGp8yxIjD0q\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-19 23:39:43', '2022-09-19 23:39:43'),
('e85539b8-99a1-4160-8859-4d3d58a8a9fe', 'App\\Notifications\\NewProjectMember', 'App\\Models\\User', 11, '{\"member_id\":1,\"project_id\":1,\"project\":\"sadfsdsdg\"}', NULL, '2022-09-21 05:08:22', '2022-09-21 05:08:22'),
('ed09a0b1-e135-437f-9874-6f8469a1eed8', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":22,\"client_id\":13,\"subject\":\"Test\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>sadasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"R2PdaIl4HDVBREPJvWRMQe2I7p4h9Gpf\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 00:01:39', '2022-09-20 00:01:39'),
('ef65322e-3cf4-41e6-9639-19465c59fb69', 'App\\Notifications\\NewProject', 'App\\Models\\User', 13, '{\"id\":1,\"project_name\":\"sadfsdsdg\",\"project_short_code\":\"Testsdfdgdsgsd\",\"project_summary\":\"<p>sadas<\\/p>\",\"project_admin\":null,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"deadline\":null,\"notes\":\"<p>asdasd<\\/p>\",\"category_id\":1,\"client_id\":13,\"team_id\":1,\"feedback\":null,\"manual_timelog\":\"disable\",\"client_view_task\":\"disable\",\"allow_client_notification\":\"disable\",\"completion_percent\":0,\"calculate_task_progress\":\"true\",\"project_budget\":null,\"currency_id\":1,\"hours_allocated\":null,\"status\":\"in progress\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"LNdKDLn7xGnG4Qp5Ig47ZF4VhvWTF9xK\",\"public\":0,\"deleted_at\":null,\"isProjectAdmin\":false}', NULL, '2022-09-21 05:08:22', '2022-09-21 05:08:22'),
('f0b0d94e-c57e-436d-8af7-65eadd406118', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":42,\"client_id\":14,\"subject\":\"sdasdasd\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"IabfRdHsinb73Icg5WCajjV5LWinNX7D\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:31:13', '2022-09-20 02:31:13'),
('f65c261c-3953-4c3b-92ea-5852c345ff9f', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":35,\"client_id\":13,\"subject\":\"asdasdas\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>saddasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"dafbuiif9oFd58p6forjM1NOOj9G0QKq\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:12:18', '2022-09-20 02:12:18'),
('f78bd83b-e860-4ea6-8914-9ec56cb4b920', 'App\\Notifications\\NewContract', 'App\\Models\\User', 13, '{\"id\":1,\"client_id\":13,\"subject\":\"sdasd\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-21T00:00:00+00:00\",\"original_start_date\":\"2022-09-21\",\"end_date\":\"2022-09-21T00:00:00+00:00\",\"original_end_date\":\"2022-09-21\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdasd<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"jv7nZwxDTnQuBbFJB5UTpH4ejf6rbLv9\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":13,\"name\":\"Client 1\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":1,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":13,\"role_id\":3}],\"client_details\":{\"id\":1,\"user_id\":13,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 20:17:49', '2022-09-20 20:17:49'),
('f8acf81c-b4ee-4153-aa34-c5ed62cd188f', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":41,\"client_id\":14,\"subject\":\"sdasdasd\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"gGudh89ZgZsvG73rWDFNFHvJa33S3HZb\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:27:15', '2022-09-20 02:27:15'),
('fc6c03bf-08d3-485f-8e06-3897918192c7', 'App\\Notifications\\NewContract', 'App\\Models\\User', 14, '{\"id\":44,\"client_id\":14,\"subject\":\"sdasdasd\",\"amount\":\"500\",\"original_amount\":\"500.00\",\"contract_type_id\":1,\"start_date\":\"2022-09-20T00:00:00+00:00\",\"original_start_date\":\"2022-09-20\",\"end_date\":\"2022-09-20T00:00:00+00:00\",\"original_end_date\":\"2022-09-20\",\"description\":\"\",\"contract_name\":null,\"company_logo\":null,\"alternate_address\":null,\"cell\":null,\"office\":null,\"city\":null,\"state\":null,\"country\":null,\"postal_code\":null,\"contract_detail\":\"<p>dasdas<\\/p>\",\"added_by\":1,\"last_updated_by\":1,\"hash\":\"hmnQ7AdBLzQ0PY9yOLzkDKTXekbEqZS6\",\"currency_id\":1,\"event_id\":null,\"image_url\":\"http:\\/\\/127.0.0.1:8000\\/user-uploads\\/app-logo\\/48db542bfee795a9175aa6443ac9692b.png\",\"currency\":{\"id\":1,\"currency_name\":\"Dollars\",\"currency_symbol\":\"$\",\"currency_code\":\"USD\",\"exchange_rate\":null,\"is_cryptocurrency\":\"no\",\"usd_price\":null},\"client\":{\"id\":14,\"name\":\"Test custom\",\"email\":null,\"two_factor_secret\":null,\"two_factor_recovery_codes\":null,\"two_factor_confirmed\":0,\"two_factor_email_confirmed\":0,\"image\":null,\"mobile\":null,\"gender\":null,\"salutation\":\"mr\",\"locale\":\"en\",\"status\":\"active\",\"login\":\"disable\",\"onesignal_player_id\":null,\"last_login\":null,\"email_notifications\":0,\"country_id\":null,\"dark_theme\":0,\"rtl\":0,\"two_fa_verify_via\":null,\"two_factor_code\":null,\"two_factor_expires_at\":null,\"admin_approval\":1,\"permission_sync\":1,\"google_calendar_status\":1,\"image_url\":\"https:\\/\\/www.gravatar.com\\/avatar\\/d41d8cd98f00b204e9800998ecf8427e.png?s=200&d=mp\",\"modules\":[\"clients\",\"projects\",\"tickets\",\"invoices\",\"estimates\",\"events\",\"messages\",\"tasks\",\"timelogs\",\"contracts\",\"notices\",\"payments\",\"orders\",\"knowledgebase\",\"employees\",\"attendance\",\"expenses\",\"leaves\",\"leads\",\"holidays\",\"products\",\"reports\",\"settings\"],\"user_other_role\":true,\"role\":[{\"user_id\":14,\"role_id\":3}],\"client_details\":{\"id\":2,\"user_id\":14,\"company_name\":null,\"address\":null,\"shipping_address\":null,\"postal_code\":null,\"state\":null,\"city\":null,\"office\":null,\"website\":null,\"note\":\"<p><br><\\/p>\",\"linkedin\":null,\"facebook\":null,\"twitter\":null,\"skype\":null,\"gst_number\":null,\"category_id\":null,\"sub_category_id\":null,\"added_by\":1,\"last_updated_by\":1},\"session\":null,\"employee_detail\":null}}', NULL, '2022-09-20 02:32:03', '2022-09-20 02:32:03');

-- --------------------------------------------------------

--
-- Table structure for table `offline_payment_methods`
--

CREATE TABLE `offline_payment_methods` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `status` enum('yes','no') COLLATE utf8mb4_unicode_ci DEFAULT 'yes',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `order_date` date NOT NULL,
  `sub_total` double(8,2) NOT NULL,
  `discount` double NOT NULL DEFAULT '0',
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percent',
  `total` double(8,2) NOT NULL,
  `status` enum('pending','on-hold','failed','processing','completed','canceled','refunded') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `show_shipping_address` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `company_address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_summary` text COLLATE utf8mb4_unicode_ci,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `quantity` double(16,2) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `amount` double(8,2) NOT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item_images`
--

CREATE TABLE `order_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_item_id` bigint(20) UNSIGNED DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organisation_settings`
--

CREATE TABLE `organisation_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `app_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_background` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `timezone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Asia/Kolkata',
  `date_format` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'd-m-Y',
  `date_picker_format` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moment_format` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_format` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'h:i a',
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `latitude` decimal(10,8) NOT NULL DEFAULT '26.91243360',
  `longitude` decimal(11,8) NOT NULL DEFAULT '75.78727090',
  `leaves_start_from` enum('joining_date','year_start') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'joining_date',
  `active_theme` enum('default','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `currency_converter_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_map_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `task_self` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `weather_key` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supported_until` timestamp NULL DEFAULT NULL,
  `google_recaptcha_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deactive',
  `google_recaptcha_v2_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deactive',
  `google_recaptcha_v2_site_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_recaptcha_v2_secret_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_recaptcha_v3_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deactive',
  `google_recaptcha_v3_site_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_recaptcha_v3_secret_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_debug` tinyint(1) NOT NULL DEFAULT '0',
  `rounded_theme` tinyint(1) NOT NULL,
  `hide_cron_message` tinyint(1) NOT NULL DEFAULT '0',
  `system_update` tinyint(1) NOT NULL DEFAULT '1',
  `logo_background_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `before_days` int(11) NOT NULL,
  `after_days` int(11) NOT NULL,
  `on_deadline` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `default_task_status` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `show_review_modal` tinyint(1) NOT NULL DEFAULT '1',
  `dashboard_clock` tinyint(1) NOT NULL DEFAULT '1',
  `ticket_form_google_captcha` tinyint(1) NOT NULL DEFAULT '0',
  `lead_form_google_captcha` tinyint(1) NOT NULL DEFAULT '0',
  `taskboard_length` int(11) NOT NULL DEFAULT '10',
  `last_cron_run` timestamp NULL DEFAULT NULL,
  `favicon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `auth_theme` enum('dark','light') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'light',
  `light_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sidebar_logo_style` enum('square','full') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'square',
  `session_driver` enum('file','database') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'file',
  `allow_client_signup` tinyint(1) NOT NULL,
  `admin_client_signup_approval` tinyint(1) NOT NULL,
  `allowed_file_types` text COLLATE utf8mb4_unicode_ci,
  `google_calendar_status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `google_client_id` text COLLATE utf8mb4_unicode_ci,
  `google_client_secret` text COLLATE utf8mb4_unicode_ci,
  `google_calendar_verification_status` enum('verified','non_verified') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'non_verified',
  `google_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` text COLLATE utf8mb4_unicode_ci,
  `allowed_file_size` int(11) NOT NULL DEFAULT '10',
  `currency_key_version` enum('free','api') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organisation_settings`
--

INSERT INTO `organisation_settings` (`id`, `company_name`, `app_name`, `company_email`, `company_phone`, `logo`, `login_background`, `address`, `website`, `currency_id`, `timezone`, `date_format`, `date_picker_format`, `moment_format`, `time_format`, `locale`, `latitude`, `longitude`, `leaves_start_from`, `active_theme`, `last_updated_by`, `currency_converter_key`, `google_map_key`, `task_self`, `created_at`, `updated_at`, `weather_key`, `purchase_code`, `license_type`, `supported_until`, `google_recaptcha_status`, `google_recaptcha_v2_status`, `google_recaptcha_v2_site_key`, `google_recaptcha_v2_secret_key`, `google_recaptcha_v3_status`, `google_recaptcha_v3_site_key`, `google_recaptcha_v3_secret_key`, `app_debug`, `rounded_theme`, `hide_cron_message`, `system_update`, `logo_background_color`, `before_days`, `after_days`, `on_deadline`, `default_task_status`, `show_review_modal`, `dashboard_clock`, `ticket_form_google_captcha`, `lead_form_google_captcha`, `taskboard_length`, `last_cron_run`, `favicon`, `auth_theme`, `light_logo`, `sidebar_logo_style`, `session_driver`, `allow_client_signup`, `admin_client_signup_approval`, `allowed_file_types`, `google_calendar_status`, `google_client_id`, `google_client_secret`, `google_calendar_verification_status`, `google_id`, `name`, `token`, `allowed_file_size`, `currency_key_version`) VALUES
(1, 'SeoPage1', 'SeoPage1', 'sayeedseopage1@gmail.com', '1234567891', '5e7ea7b804ca59b595cd3bb6ee2d0083.png', NULL, 'Your Company address here', 'https://seopage1.net', 1, 'Asia/Kolkata', 'd-m-Y', 'dd-mm-yyyy', 'DD-MM-YYYY', 'h:i a', 'en', '26.91243360', '75.78727090', 'joining_date', 'default', 1, NULL, NULL, 'yes', '2022-09-19 00:15:06', '2022-09-21 01:55:27', '', NULL, NULL, NULL, 'deactive', 'deactive', NULL, NULL, 'deactive', NULL, NULL, 1, 1, 0, 1, '#FFFFFF', 0, 0, 'yes', 1, 1, 0, 0, 0, 10, NULL, '4370176e9eae3c21fb4aa4c6bcd8d861.png', 'light', '48db542bfee795a9175aa6443ac9692b.png', 'full', 'file', 0, 0, 'image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,application/x-zip-compressed,application/x-compressed,multipart/x-zip,.xlsx,video/x-flv,video/mp4,application/x-mpegURL,video/MP2T,video/3gpp,video/quicktime,video/x-msvideo,video/x-ms-wmv,application/sla,.stl', 'inactive', NULL, NULL, 'non_verified', NULL, NULL, NULL, 10, 'free');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `credit_notes_id` int(10) UNSIGNED DEFAULT NULL,
  `amount` double NOT NULL,
  `gateway` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `plan_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('complete','pending','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_on` datetime DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `offline_method_id` int(10) UNSIGNED DEFAULT NULL,
  `bill` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `payment_gateway_response` text COLLATE utf8mb4_unicode_ci COMMENT 'null = success',
  `payload_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_gateway_credentials`
--

CREATE TABLE `payment_gateway_credentials` (
  `id` int(10) UNSIGNED NOT NULL,
  `paypal_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `live_stripe_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_stripe_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_stripe_webhook_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `live_razorpay_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_razorpay_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `razorpay_status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `paypal_mode` enum('sandbox','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sandbox',
  `sandbox_paypal_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sandbox_paypal_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_stripe_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_stripe_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_razorpay_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_razorpay_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_stripe_webhook_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_mode` enum('test','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'test',
  `razorpay_mode` enum('test','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'test',
  `paystack_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paystack_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paystack_merchant_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paystack_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci DEFAULT 'deactive',
  `paystack_mode` enum('sandbox','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sandbox',
  `test_paystack_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_paystack_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_paystack_merchant_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paystack_payment_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'https://api.paystack.co',
  `mollie_api_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mollie_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci DEFAULT 'deactive',
  `payfast_merchant_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payfast_merchant_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payfast_passphrase` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payfast_mode` enum('sandbox','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sandbox',
  `payfast_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci DEFAULT 'deactive',
  `authorize_api_login_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorize_transaction_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorize_environment` enum('sandbox','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sandbox',
  `authorize_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deactive',
  `square_application_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `square_access_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `square_location_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `square_environment` enum('sandbox','production') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sandbox',
  `square_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deactive',
  `flutterwave_status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'deactive',
  `flutterwave_mode` enum('sandbox','live') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sandbox',
  `test_flutterwave_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_flutterwave_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `test_flutterwave_hash` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_flutterwave_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_flutterwave_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_flutterwave_hash` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flutterwave_webhook_secret_hash` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_gateway_credentials`
--

INSERT INTO `payment_gateway_credentials` (`id`, `paypal_client_id`, `paypal_secret`, `paypal_status`, `live_stripe_client_id`, `live_stripe_secret`, `live_stripe_webhook_secret`, `stripe_status`, `created_at`, `updated_at`, `live_razorpay_key`, `live_razorpay_secret`, `razorpay_status`, `paypal_mode`, `sandbox_paypal_client_id`, `sandbox_paypal_secret`, `test_stripe_client_id`, `test_stripe_secret`, `test_razorpay_key`, `test_razorpay_secret`, `test_stripe_webhook_secret`, `stripe_mode`, `razorpay_mode`, `paystack_key`, `paystack_secret`, `paystack_merchant_email`, `paystack_status`, `paystack_mode`, `test_paystack_key`, `test_paystack_secret`, `test_paystack_merchant_email`, `paystack_payment_url`, `mollie_api_key`, `mollie_status`, `payfast_merchant_id`, `payfast_merchant_key`, `payfast_passphrase`, `payfast_mode`, `payfast_status`, `authorize_api_login_id`, `authorize_transaction_key`, `authorize_environment`, `authorize_status`, `square_application_id`, `square_access_token`, `square_location_id`, `square_environment`, `square_status`, `flutterwave_status`, `flutterwave_mode`, `test_flutterwave_key`, `test_flutterwave_secret`, `test_flutterwave_hash`, `live_flutterwave_key`, `live_flutterwave_secret`, `live_flutterwave_hash`, `flutterwave_webhook_secret_hash`) VALUES
(1, NULL, NULL, 'active', NULL, NULL, NULL, 'active', '2022-09-19 00:15:04', '2022-09-19 00:15:04', NULL, NULL, 'inactive', 'sandbox', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'test', 'test', NULL, NULL, NULL, 'deactive', 'sandbox', NULL, NULL, NULL, 'https://api.paystack.co', NULL, 'deactive', NULL, NULL, NULL, 'sandbox', 'deactive', NULL, NULL, 'sandbox', 'deactive', NULL, NULL, NULL, 'sandbox', 'deactive', 'deactive', 'sandbox', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_custom` tinyint(1) NOT NULL DEFAULT '0',
  `allowed_permissions` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `module_id`, `created_at`, `updated_at`, `is_custom`, `allowed_permissions`) VALUES
(1, 'add_clients', 'Add Clients', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(2, 'view_clients', 'View Clients', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(3, 'edit_clients', 'Edit Clients', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(4, 'delete_clients', 'Delete Clients', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(5, 'manage_client_category', 'Manage Client Category', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(6, 'manage_client_subcategory', 'Manage Client Subcategory', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(7, 'add_client_contacts', 'Add Client Contacts', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(8, 'view_client_contacts', 'View Client Contacts', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(9, 'edit_client_contacts', 'Edit Client Contacts', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(10, 'delete_client_contacts', 'Delete Client Contacts', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(11, 'add_client_note', 'Add Client Note', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(12, 'view_client_note', 'View Client Note', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(13, 'edit_client_note', 'Edit Client Note', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(14, 'delete_client_note', 'Delete Client Note', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(15, 'add_client_document', 'Add Client Document', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(16, 'view_client_document', 'View Client Document', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(17, 'edit_client_document', 'Edit Client Document', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(18, 'delete_client_document', 'Delete Client Document', NULL, 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(19, 'add_employees', 'Add Employees', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(20, 'view_employees', 'View Employees', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(21, 'edit_employees', 'Edit Employees', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(22, 'delete_employees', 'Delete Employees', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(23, 'add_designation', 'Add Designation', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(24, 'view_designation', 'View Designation', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(25, 'edit_designation', 'Edit Designation', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(26, 'delete_designation', 'Delete Designation', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(27, 'add_department', 'Add Department', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(28, 'view_department', 'View Department', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(29, 'edit_department', 'Edit Department', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(30, 'delete_department', 'Delete Department', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(31, 'add_documents', 'Add Documents', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(32, 'view_documents', 'View Documents', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(33, 'edit_documents', 'Edit Documents', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(34, 'delete_documents', 'Delete Documents', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(35, 'view_leaves_taken', 'View Leaves Taken', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(36, 'update_leaves_quota', 'Update Leaves Quota', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(37, 'view_employee_tasks', 'View Employee Tasks', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(38, 'view_employee_projects', 'View Employee Projects', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(39, 'view_employee_timelogs', 'View Employee Timelogs', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(40, 'change_employee_role', 'Change Employee Role', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(41, 'manage_emergency_contact', 'Manage Emergency Contact', NULL, 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(42, 'add_projects', 'Add Project', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(43, 'view_projects', 'View Project', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(44, 'edit_projects', 'Edit Project', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(45, 'delete_projects', 'Delete Project', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(46, 'manage_project_category', 'Manage Project Category', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(47, 'view_project_files', 'View Project Files', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(48, 'add_project_files', 'Add Project Files', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(49, 'delete_project_files', 'Delete Project Files', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(50, 'view_project_discussions', 'View Project Discussions', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(51, 'add_project_discussions', 'Add Project Discussions', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(52, 'edit_project_discussions', 'Edit Project Discussions', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(53, 'delete_project_discussions', 'Delete Project Discussions', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(54, 'manage_discussion_category', 'Manage Discussion Category', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(55, 'view_project_milestones', 'View Project Milestones', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2, \"none\":5}'),
(56, 'add_project_milestones', 'Add Project Milestones', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(57, 'edit_project_milestones', 'Edit Project Milestones', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2, \"none\":5}'),
(58, 'delete_project_milestones', 'Delete Project Milestones', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2, \"none\":5}'),
(59, 'view_project_members', 'View Project Members', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(60, 'add_project_members', 'Add Project Members', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(61, 'edit_project_members', 'Edit Project Members', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(62, 'delete_project_members', 'Delete Project Members', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(63, 'view_project_rating', 'View Project Rating', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(64, 'add_project_rating', 'Add Project Rating', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(65, 'edit_project_rating', 'Edit Project Rating', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(66, 'delete_project_rating', 'Delete Project Rating', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(67, 'view_project_budget', 'View Project Budget', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(68, 'view_project_timelogs', 'View Project Timelogs', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(69, 'view_project_expenses', 'View Project Expenses', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(70, 'view_project_tasks', 'View Project Tasks', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(71, 'view_project_invoices', 'View Project Invoices', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(72, 'view_project_burndown_chart', 'View Project Burndown Chart', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(73, 'view_project_payments', 'View Project Payments', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(74, 'view_project_gantt_chart', 'View Project Gantt Chart', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(75, 'add_project_note', 'Add Project Note', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(76, 'view_project_note', 'View Project Note', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(77, 'edit_project_note', 'Edit Project Note', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(78, 'delete_project_note', 'Delete Project Note', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(79, 'manage_project_template', 'Manage Project Template', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(80, 'view_project_hourly_rates', 'View Project Hourly Rates', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(81, 'create_public_project', 'Create Public Project', NULL, 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(82, 'manage_employee_shifts', 'Manage Employee Shifts', NULL, 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(83, 'view_shift_roster', 'View Shift Roster', NULL, 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"owned\":2, \"none\":5}'),
(84, 'add_attendance', 'Add Attendance', NULL, 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(85, 'view_attendance', 'View Attendance', NULL, 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(86, 'edit_attendance', 'Edit Attendance', NULL, 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(87, 'delete_attendance', 'Delete Attendance', NULL, 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(88, 'add_tasks', 'Add Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(89, 'view_tasks', 'View Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(90, 'edit_tasks', 'Edit Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(91, 'delete_tasks', 'Delete Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(92, 'view_task_category', 'View Task Category', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(93, 'add_task_category', 'Add Task Category', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(94, 'edit_task_category', 'Edit Task Category', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(95, 'delete_task_category', 'Delete Task Category', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(96, 'view_task_files', 'View Task Files', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(97, 'add_task_files', 'Add Task Files', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(98, 'delete_task_files', 'Delete Task Files', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(99, 'view_sub_tasks', 'View Sub Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(100, 'add_sub_tasks', 'Add Sub Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(101, 'edit_sub_tasks', 'Edit Sub Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(102, 'delete_sub_tasks', 'Delete Sub Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(103, 'view_task_comments', 'View Task Comments', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(104, 'add_task_comments', 'Add Task Comments', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(105, 'edit_task_comments', 'Edit Task Comments', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(106, 'delete_task_comments', 'Delete Task Comments', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(107, 'view_task_notes', 'View Task Notes', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(108, 'add_task_notes', 'Add Task Notes', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(109, 'edit_task_notes', 'Edit Task Notes', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(110, 'delete_task_notes', 'Delete Task Notes', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(111, 'task_labels', 'Task Labels', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(112, 'change_status', 'Change Status', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(113, 'send_reminder', 'Send Reminder', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(114, 'add_status', 'Add Status', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(115, 'view_unassigned_tasks', 'View Unassigned Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(116, 'create_unassigned_tasks', 'Create Unassigned Tasks', NULL, 5, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(117, 'add_estimates', 'Add Estimates', NULL, 6, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(118, 'view_estimates', 'View Estimates', NULL, 6, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(119, 'edit_estimates', 'Edit Estimates', NULL, 6, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(120, 'delete_estimates', 'Delete Estimates', NULL, 6, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(121, 'add_invoices', 'Add Invoices', NULL, 7, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(122, 'view_invoices', 'View Invoices', NULL, 7, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(123, 'edit_invoices', 'Edit Invoices', NULL, 7, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(124, 'delete_invoices', 'Delete Invoices', NULL, 7, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(125, 'manage_tax', 'Manage Tax', NULL, 7, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(126, 'add_payments', 'Add Payments', NULL, 8, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(127, 'view_payments', 'View Payments', NULL, 8, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(128, 'edit_payments', 'Edit Payments', NULL, 8, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(129, 'delete_payments', 'Delete Payments', NULL, 8, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(130, 'add_timelogs', 'Add Timelogs', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4,\"added\":1, \"none\":5}'),
(131, 'view_timelogs', 'View Timelogs', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(132, 'edit_timelogs', 'Edit Timelogs', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(133, 'delete_timelogs', 'Delete Timelogs', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(134, 'approve_timelogs', 'Approve Timelogs', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(135, 'manage_active_timelogs', 'Manage Active Timelogs', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(136, 'view_timelog_earnings', 'View Timelog Earnings', NULL, 9, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(137, 'add_tickets', 'Add Tickets', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4,\"added\":1, \"none\":5}'),
(138, 'view_tickets', 'View Tickets', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(139, 'edit_tickets', 'Edit Tickets', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(140, 'delete_tickets', 'Delete Tickets', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(141, 'manage_ticket_type', 'Manage Ticket Type', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(142, 'manage_ticket_agent', 'Manage Ticket Agent', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(143, 'manage_ticket_channel', 'Manage Ticket Channel', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(144, 'manage_ticket_tags', 'Manage Ticket Tags', NULL, 10, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(145, 'add_events', 'Add Events', NULL, 11, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(146, 'view_events', 'View Events', NULL, 11, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(147, 'edit_events', 'Edit Events', NULL, 11, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(148, 'delete_events', 'Delete Events', NULL, 11, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(149, 'add_notice', 'Add Notice', NULL, 12, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(150, 'view_notice', 'View Notice', NULL, 12, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(151, 'edit_notice', 'Edit Notice', NULL, 12, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(152, 'delete_notice', 'Delete Notice', NULL, 12, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(153, 'add_leave', 'Add Leave', NULL, 13, '2022-09-19 00:15:04', '2022-08-10 01:50:41', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(154, 'view_leave', 'View Leave', NULL, 13, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(155, 'edit_leave', 'Edit Leave', NULL, 13, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(156, 'delete_leave', 'Delete Leave', NULL, 13, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(157, 'approve_or_reject_leaves', 'Approve Or Reject Leaves', NULL, 13, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(158, 'add_lead', 'Add Lead', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(159, 'view_lead', 'View Lead', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(160, 'edit_lead', 'Edit Lead', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(161, 'delete_lead', 'Delete Lead', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(162, 'view_lead_agents', 'View Lead Agents', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(163, 'add_lead_agent', 'Add Lead Agent', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(164, 'edit_lead_agent', 'Edit Lead Agent', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(165, 'delete_lead_agent', 'Delete Lead Agent', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(166, 'view_lead_category', 'View Lead Category', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(167, 'add_lead_category', 'Add Lead Category', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(168, 'edit_lead_category', 'Edit Lead Category', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(169, 'delete_lead_category', 'Delete Lead Category', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(170, 'manage_lead_custom_forms', 'Manage Lead Custom Forms', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(171, 'view_lead_files', 'View Lead Files', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(172, 'add_lead_files', 'Add Lead Files', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(173, 'delete_lead_files', 'Delete Lead Files', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(174, 'view_lead_follow_up', 'View Lead Follow Up', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(175, 'add_lead_follow_up', 'Add Lead Follow Up', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(176, 'edit_lead_follow_up', 'Edit Lead Follow Up', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(177, 'delete_lead_follow_up', 'Delete Lead Follow Up', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(178, 'view_lead_sources', 'View Lead Sources', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(179, 'add_lead_sources', 'Add Lead Sources', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(180, 'edit_lead_sources', 'Edit Lead Sources', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(181, 'delete_lead_sources', 'Delete Lead Sources', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(182, 'view_lead_proposals', 'View Lead Proposals', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(183, 'add_lead_proposals', 'Add Lead Proposals', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(184, 'edit_lead_proposals', 'Edit Lead Proposals', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(185, 'delete_lead_proposals', 'Delete Lead Proposals', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(186, 'manage_proposal_template', 'Manage Proposal Template', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(187, 'change_lead_status', 'Change Lead Status', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(188, 'add_lead_note', 'Add Lead Note', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(189, 'view_lead_note', 'View Lead Note', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(190, 'edit_lead_note', 'Edit Lead Note', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(191, 'delete_lead_note', 'Delete Lead Note', NULL, 14, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(192, 'add_holiday', 'Add Holiday', NULL, 15, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(193, 'view_holiday', 'View Holiday', NULL, 15, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(194, 'edit_holiday', 'Edit Holiday', NULL, 15, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(195, 'delete_holiday', 'Delete Holiday', NULL, 15, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(196, 'add_product', 'Add Product', NULL, 16, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(197, 'view_product', 'View Product', NULL, 16, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(198, 'edit_product', 'Edit Product', NULL, 16, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(199, 'delete_product', 'Delete Product', NULL, 16, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(200, 'manage_product_category', 'Manage Product Category', NULL, 16, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(201, 'manage_product_sub_category', 'Manage Product Sub Category', NULL, 16, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(202, 'add_expenses', 'Add Expenses', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"none\":5}'),
(203, 'view_expenses', 'View Expenses', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(204, 'edit_expenses', 'Edit Expenses', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(205, 'delete_expenses', 'Delete Expenses', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(206, 'manage_expense_category', 'Manage Expense Category', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(207, 'manage_recurring_expense', 'Manage Recurring Expense', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(208, 'approve_expenses', 'Approve Expenses', NULL, 17, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(209, 'add_contract', 'Add Contract', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(210, 'view_contract', 'View Contract', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(211, 'edit_contract', 'Edit Contract', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(212, 'delete_contract', 'Delete Contract', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(213, 'manage_contract_type', 'Manage Contract Type', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(214, 'renew_contract', 'Renew Contract', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(215, 'add_contract_discussion', 'Add Contract Discussion', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(216, 'edit_contract_discussion', 'Edit Contract Discussion', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(217, 'view_contract_discussion', 'View Contract Discussion', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(218, 'delete_contract_discussion', 'Delete Contract Discussion', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(219, 'add_contract_files', 'Add Contract Files', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(220, 'view_contract_files', 'View Contract Files', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(221, 'delete_contract_files', 'Delete Contract Files', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(222, 'manage_contract_template', 'Manage Contract Template', NULL, 18, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"none\":5}'),
(223, 'view_task_report', 'View Task Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(224, 'view_time_log_report', 'View Time Log Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(225, 'view_finance_report', 'View Finance Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(226, 'view_income_expense_report', 'View Income Vs Expense Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(227, 'view_leave_report', 'View Leave Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(228, 'view_attendance_report', 'View Attendance Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(229, 'view_expense_report', 'View Expense Report', NULL, 19, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(230, 'manage_company_setting', 'Manage Company Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(231, 'manage_app_setting', 'Manage App Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(232, 'manage_notification_setting', 'Manage Notification Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(233, 'manage_currency_setting', 'Manage Currency Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(234, 'manage_payment_setting', 'Manage Payment Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(235, 'manage_finance_setting', 'Manage Finance Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(236, 'manage_ticket_setting', 'Manage Ticket Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(237, 'manage_project_setting', 'Manage Project Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(238, 'manage_attendance_setting', 'Manage Attendance Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(239, 'manage_leave_setting', 'Manage Leave Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(240, 'manage_custom_field_setting', 'Manage Custom Field Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(241, 'manage_message_setting', 'Manage Message Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(242, 'manage_storage_setting', 'Manage Storage Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(243, 'manage_language_setting', 'Manage Language Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(244, 'manage_lead_setting', 'Manage Lead Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(245, 'manage_time_log_setting', 'Manage Time Log Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(246, 'manage_task_setting', 'Manage Task Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(247, 'manage_social_login_setting', 'Manage Social Login Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(248, 'manage_security_setting', 'Manage Security Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(249, 'manage_gdpr_setting', 'Manage GDPR Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(250, 'manage_theme_setting', 'Manage Theme Settings', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(251, 'manage_role_permission_setting', 'Manage Role Permission Setting', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(252, 'manage_module_setting', 'Manage Module Setting', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(253, 'manage_google_calendar_setting', 'Manage Google Calendar Setting', NULL, 20, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(254, 'view_overview_dashboard', 'View Overview Dashboard', NULL, 21, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(255, 'view_project_dashboard', 'View Project Dashboard', NULL, 21, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(256, 'view_client_dashboard', 'View Client Dashboard', NULL, 21, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(257, 'view_hr_dashboard', 'View Hr Dashboard', NULL, 21, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(258, 'view_ticket_dashboard', 'View Ticket Dashboard', NULL, 21, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(259, 'view_finance_dashboard', 'View Finance Dashboard', NULL, 21, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 1, '{\"all\":4, \"none\":5}'),
(260, 'add_order', 'Add Order', NULL, 22, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"none\":5}'),
(261, 'view_order', 'View Order', NULL, 22, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(262, 'edit_order', 'Edit Order', NULL, 22, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(263, 'delete_order', 'Delete Order', NULL, 22, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4, \"added\":1, \"owned\":2,\"both\":3, \"none\":5}'),
(264, 'add_knowledgebase', 'Add Knowledgebase', NULL, 23, '2022-09-19 00:15:04', NULL, 0, '{\"all\":4, \"none\":5}'),
(265, 'view_knowledgebase', 'View Knowledgebase', NULL, 23, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4,\"added\":1,\"none\":5}'),
(266, 'edit_knowledgebase', 'Edit Knowledgebase', NULL, 23, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4,\"added\":1,\"none\":5}'),
(267, 'delete_knowledgebase', 'Delete Knowledgebase', NULL, 23, '2022-09-19 00:15:04', '2022-09-19 00:15:04', 0, '{\"all\":4,\"added\":1,\"none\":5}');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `permission_type_id` bigint(20) UNSIGNED NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`, `permission_type_id`) VALUES
(49, 2, 1),
(49, 3, 1),
(52, 2, 1),
(52, 3, 1),
(53, 2, 1),
(53, 3, 1),
(88, 2, 1),
(90, 2, 1),
(91, 2, 1),
(98, 2, 1),
(101, 2, 1),
(102, 2, 1),
(105, 2, 1),
(105, 3, 1),
(106, 2, 1),
(106, 3, 1),
(109, 2, 1),
(109, 3, 1),
(110, 2, 1),
(110, 3, 1),
(130, 2, 1),
(132, 2, 1),
(137, 2, 1),
(137, 3, 1),
(139, 3, 1),
(140, 2, 1),
(140, 3, 1),
(153, 2, 1),
(158, 2, 1),
(160, 2, 1),
(171, 2, 1),
(176, 2, 1),
(177, 2, 1),
(202, 2, 1),
(204, 2, 1),
(205, 2, 1),
(43, 2, 2),
(43, 3, 2),
(85, 2, 2),
(89, 3, 2),
(118, 3, 2),
(122, 3, 2),
(127, 3, 2),
(131, 3, 2),
(146, 2, 2),
(146, 3, 2),
(150, 2, 2),
(150, 3, 2),
(210, 3, 2),
(261, 3, 2),
(89, 2, 3),
(131, 2, 3),
(138, 2, 3),
(138, 3, 3),
(139, 2, 3),
(154, 2, 3),
(159, 2, 3),
(187, 2, 3),
(203, 2, 3),
(1, 1, 4),
(2, 1, 4),
(3, 1, 4),
(4, 1, 4),
(5, 1, 4),
(6, 1, 4),
(7, 1, 4),
(8, 1, 4),
(9, 1, 4),
(10, 1, 4),
(11, 1, 4),
(12, 1, 4),
(13, 1, 4),
(14, 1, 4),
(15, 1, 4),
(16, 1, 4),
(17, 1, 4),
(18, 1, 4),
(19, 1, 4),
(20, 1, 4),
(21, 1, 4),
(22, 1, 4),
(23, 1, 4),
(24, 1, 4),
(25, 1, 4),
(26, 1, 4),
(27, 1, 4),
(28, 1, 4),
(29, 1, 4),
(30, 1, 4),
(31, 1, 4),
(32, 1, 4),
(33, 1, 4),
(34, 1, 4),
(35, 1, 4),
(35, 2, 4),
(36, 1, 4),
(37, 1, 4),
(38, 1, 4),
(39, 1, 4),
(40, 1, 4),
(41, 1, 4),
(42, 1, 4),
(43, 1, 4),
(44, 1, 4),
(45, 1, 4),
(46, 1, 4),
(47, 1, 4),
(47, 2, 4),
(47, 3, 4),
(48, 1, 4),
(48, 2, 4),
(48, 3, 4),
(49, 1, 4),
(50, 1, 4),
(50, 2, 4),
(50, 3, 4),
(51, 1, 4),
(51, 2, 4),
(51, 3, 4),
(52, 1, 4),
(53, 1, 4),
(54, 1, 4),
(55, 1, 4),
(56, 1, 4),
(57, 1, 4),
(58, 1, 4),
(59, 1, 4),
(59, 2, 4),
(59, 3, 4),
(60, 1, 4),
(61, 1, 4),
(62, 1, 4),
(63, 1, 4),
(64, 1, 4),
(65, 1, 4),
(66, 1, 4),
(67, 1, 4),
(68, 1, 4),
(68, 2, 4),
(68, 3, 4),
(69, 1, 4),
(70, 1, 4),
(70, 2, 4),
(70, 3, 4),
(71, 1, 4),
(71, 3, 4),
(72, 1, 4),
(73, 1, 4),
(73, 3, 4),
(74, 1, 4),
(75, 1, 4),
(76, 1, 4),
(76, 2, 4),
(76, 3, 4),
(77, 1, 4),
(78, 1, 4),
(79, 1, 4),
(80, 1, 4),
(81, 1, 4),
(82, 1, 4),
(83, 1, 4),
(84, 1, 4),
(85, 1, 4),
(86, 1, 4),
(87, 1, 4),
(88, 1, 4),
(89, 1, 4),
(90, 1, 4),
(91, 1, 4),
(92, 1, 4),
(93, 1, 4),
(94, 1, 4),
(95, 1, 4),
(96, 1, 4),
(96, 2, 4),
(96, 3, 4),
(97, 1, 4),
(97, 2, 4),
(98, 1, 4),
(99, 1, 4),
(99, 2, 4),
(99, 3, 4),
(100, 1, 4),
(100, 2, 4),
(101, 1, 4),
(102, 1, 4),
(103, 1, 4),
(103, 2, 4),
(103, 3, 4),
(104, 1, 4),
(104, 2, 4),
(104, 3, 4),
(105, 1, 4),
(106, 1, 4),
(107, 1, 4),
(107, 2, 4),
(107, 3, 4),
(108, 1, 4),
(108, 2, 4),
(108, 3, 4),
(109, 1, 4),
(110, 1, 4),
(111, 1, 4),
(112, 1, 4),
(113, 1, 4),
(114, 1, 4),
(115, 1, 4),
(116, 1, 4),
(117, 1, 4),
(118, 1, 4),
(119, 1, 4),
(120, 1, 4),
(121, 1, 4),
(122, 1, 4),
(123, 1, 4),
(124, 1, 4),
(125, 1, 4),
(126, 1, 4),
(127, 1, 4),
(128, 1, 4),
(129, 1, 4),
(130, 1, 4),
(131, 1, 4),
(132, 1, 4),
(133, 1, 4),
(134, 1, 4),
(135, 1, 4),
(136, 1, 4),
(137, 1, 4),
(138, 1, 4),
(139, 1, 4),
(140, 1, 4),
(141, 1, 4),
(142, 1, 4),
(143, 1, 4),
(144, 1, 4),
(145, 1, 4),
(146, 1, 4),
(147, 1, 4),
(148, 1, 4),
(149, 1, 4),
(150, 1, 4),
(151, 1, 4),
(152, 1, 4),
(153, 1, 4),
(154, 1, 4),
(155, 1, 4),
(156, 1, 4),
(157, 1, 4),
(158, 1, 4),
(159, 1, 4),
(160, 1, 4),
(161, 1, 4),
(162, 1, 4),
(163, 1, 4),
(164, 1, 4),
(165, 1, 4),
(166, 1, 4),
(167, 1, 4),
(168, 1, 4),
(169, 1, 4),
(170, 1, 4),
(171, 1, 4),
(172, 1, 4),
(172, 2, 4),
(173, 1, 4),
(174, 1, 4),
(174, 2, 4),
(175, 1, 4),
(175, 2, 4),
(176, 1, 4),
(177, 1, 4),
(178, 1, 4),
(179, 1, 4),
(180, 1, 4),
(181, 1, 4),
(182, 1, 4),
(183, 1, 4),
(184, 1, 4),
(185, 1, 4),
(186, 1, 4),
(187, 1, 4),
(188, 1, 4),
(189, 1, 4),
(190, 1, 4),
(191, 1, 4),
(192, 1, 4),
(193, 1, 4),
(193, 2, 4),
(194, 1, 4),
(195, 1, 4),
(196, 1, 4),
(197, 1, 4),
(197, 3, 4),
(198, 1, 4),
(199, 1, 4),
(200, 1, 4),
(201, 1, 4),
(202, 1, 4),
(203, 1, 4),
(204, 1, 4),
(205, 1, 4),
(206, 1, 4),
(207, 1, 4),
(208, 1, 4),
(209, 1, 4),
(210, 1, 4),
(211, 1, 4),
(212, 1, 4),
(213, 1, 4),
(214, 1, 4),
(215, 1, 4),
(215, 3, 4),
(216, 1, 4),
(217, 1, 4),
(217, 3, 4),
(218, 1, 4),
(219, 1, 4),
(220, 1, 4),
(220, 3, 4),
(221, 1, 4),
(222, 1, 4),
(223, 1, 4),
(224, 1, 4),
(225, 1, 4),
(226, 1, 4),
(227, 1, 4),
(228, 1, 4),
(229, 1, 4),
(230, 1, 4),
(231, 1, 4),
(232, 1, 4),
(233, 1, 4),
(234, 1, 4),
(235, 1, 4),
(236, 1, 4),
(237, 1, 4),
(238, 1, 4),
(239, 1, 4),
(240, 1, 4),
(241, 1, 4),
(242, 1, 4),
(243, 1, 4),
(244, 1, 4),
(245, 1, 4),
(246, 1, 4),
(247, 1, 4),
(248, 1, 4),
(249, 1, 4),
(250, 1, 4),
(251, 1, 4),
(252, 1, 4),
(253, 1, 4),
(254, 1, 4),
(255, 1, 4),
(256, 1, 4),
(257, 1, 4),
(258, 1, 4),
(259, 1, 4),
(260, 1, 4),
(261, 1, 4),
(262, 1, 4),
(263, 1, 4),
(264, 1, 4),
(265, 1, 4),
(266, 1, 4),
(267, 1, 4),
(1, 2, 5),
(1, 3, 5),
(1, 4, 5),
(2, 2, 5),
(2, 3, 5),
(2, 4, 5),
(3, 2, 5),
(3, 3, 5),
(3, 4, 5),
(4, 2, 5),
(4, 3, 5),
(4, 4, 5),
(5, 2, 5),
(5, 3, 5),
(5, 4, 5),
(6, 2, 5),
(6, 3, 5),
(6, 4, 5),
(7, 2, 5),
(7, 3, 5),
(7, 4, 5),
(8, 2, 5),
(8, 3, 5),
(8, 4, 5),
(9, 2, 5),
(9, 3, 5),
(9, 4, 5),
(10, 2, 5),
(10, 3, 5),
(10, 4, 5),
(11, 2, 5),
(11, 3, 5),
(11, 4, 5),
(12, 2, 5),
(12, 3, 5),
(12, 4, 5),
(13, 2, 5),
(13, 3, 5),
(13, 4, 5),
(14, 2, 5),
(14, 3, 5),
(14, 4, 5),
(15, 2, 5),
(15, 3, 5),
(15, 4, 5),
(16, 2, 5),
(16, 3, 5),
(16, 4, 5),
(17, 2, 5),
(17, 3, 5),
(17, 4, 5),
(18, 2, 5),
(18, 3, 5),
(18, 4, 5),
(19, 2, 5),
(19, 3, 5),
(19, 4, 5),
(20, 2, 5),
(20, 3, 5),
(20, 4, 5),
(21, 2, 5),
(21, 3, 5),
(21, 4, 5),
(22, 2, 5),
(22, 3, 5),
(22, 4, 5),
(23, 2, 5),
(23, 3, 5),
(23, 4, 5),
(24, 2, 5),
(24, 3, 5),
(24, 4, 5),
(25, 2, 5),
(25, 3, 5),
(25, 4, 5),
(26, 2, 5),
(26, 3, 5),
(26, 4, 5),
(27, 2, 5),
(27, 3, 5),
(27, 4, 5),
(28, 2, 5),
(28, 3, 5),
(28, 4, 5),
(29, 2, 5),
(29, 3, 5),
(29, 4, 5),
(30, 2, 5),
(30, 3, 5),
(30, 4, 5),
(31, 2, 5),
(31, 3, 5),
(31, 4, 5),
(32, 2, 5),
(32, 3, 5),
(32, 4, 5),
(33, 2, 5),
(33, 3, 5),
(33, 4, 5),
(34, 2, 5),
(34, 3, 5),
(34, 4, 5),
(35, 3, 5),
(35, 4, 5),
(36, 2, 5),
(36, 3, 5),
(36, 4, 5),
(37, 2, 5),
(37, 3, 5),
(37, 4, 5),
(38, 2, 5),
(38, 3, 5),
(38, 4, 5),
(39, 2, 5),
(39, 3, 5),
(39, 4, 5),
(40, 2, 5),
(40, 3, 5),
(40, 4, 5),
(41, 2, 5),
(41, 3, 5),
(41, 4, 5),
(42, 2, 5),
(42, 3, 5),
(42, 4, 5),
(43, 4, 5),
(44, 2, 5),
(44, 3, 5),
(44, 4, 5),
(45, 2, 5),
(45, 3, 5),
(45, 4, 5),
(46, 2, 5),
(46, 3, 5),
(46, 4, 5),
(47, 4, 5),
(48, 4, 5),
(49, 4, 5),
(50, 4, 5),
(51, 4, 5),
(52, 4, 5),
(53, 4, 5),
(54, 2, 5),
(54, 3, 5),
(54, 4, 5),
(55, 2, 5),
(55, 3, 5),
(55, 4, 5),
(56, 2, 5),
(56, 3, 5),
(56, 4, 5),
(57, 2, 5),
(57, 3, 5),
(57, 4, 5),
(58, 2, 5),
(58, 3, 5),
(58, 4, 5),
(59, 4, 5),
(60, 2, 5),
(60, 3, 5),
(60, 4, 5),
(61, 2, 5),
(61, 3, 5),
(61, 4, 5),
(62, 2, 5),
(62, 3, 5),
(62, 4, 5),
(63, 2, 5),
(63, 3, 5),
(63, 4, 5),
(64, 2, 5),
(64, 3, 5),
(64, 4, 5),
(65, 2, 5),
(65, 3, 5),
(65, 4, 5),
(66, 2, 5),
(66, 3, 5),
(66, 4, 5),
(67, 2, 5),
(67, 3, 5),
(67, 4, 5),
(68, 4, 5),
(69, 2, 5),
(69, 3, 5),
(69, 4, 5),
(70, 4, 5),
(71, 2, 5),
(71, 4, 5),
(72, 2, 5),
(72, 3, 5),
(72, 4, 5),
(73, 2, 5),
(73, 4, 5),
(74, 2, 5),
(74, 3, 5),
(74, 4, 5),
(75, 2, 5),
(75, 3, 5),
(75, 4, 5),
(76, 4, 5),
(77, 2, 5),
(77, 3, 5),
(77, 4, 5),
(78, 2, 5),
(78, 3, 5),
(78, 4, 5),
(79, 2, 5),
(79, 3, 5),
(79, 4, 5),
(80, 2, 5),
(80, 3, 5),
(80, 4, 5),
(81, 2, 5),
(81, 3, 5),
(81, 4, 5),
(82, 2, 5),
(82, 3, 5),
(82, 4, 5),
(83, 2, 5),
(83, 3, 5),
(83, 4, 5),
(84, 2, 5),
(84, 3, 5),
(84, 4, 5),
(85, 3, 5),
(85, 4, 5),
(86, 2, 5),
(86, 3, 5),
(86, 4, 5),
(87, 2, 5),
(87, 3, 5),
(87, 4, 5),
(88, 3, 5),
(88, 4, 5),
(89, 4, 5),
(90, 3, 5),
(90, 4, 5),
(91, 3, 5),
(91, 4, 5),
(92, 2, 5),
(92, 3, 5),
(92, 4, 5),
(93, 2, 5),
(93, 3, 5),
(93, 4, 5),
(94, 2, 5),
(94, 3, 5),
(94, 4, 5),
(95, 2, 5),
(95, 3, 5),
(95, 4, 5),
(96, 4, 5),
(97, 3, 5),
(97, 4, 5),
(98, 3, 5),
(98, 4, 5),
(99, 4, 5),
(100, 3, 5),
(100, 4, 5),
(101, 3, 5),
(101, 4, 5),
(102, 3, 5),
(102, 4, 5),
(103, 4, 5),
(104, 4, 5),
(105, 4, 5),
(106, 4, 5),
(107, 4, 5),
(108, 4, 5),
(109, 4, 5),
(110, 4, 5),
(111, 2, 5),
(111, 3, 5),
(111, 4, 5),
(112, 2, 5),
(112, 3, 5),
(112, 4, 5),
(113, 2, 5),
(113, 3, 5),
(113, 4, 5),
(114, 2, 5),
(114, 3, 5),
(114, 4, 5),
(115, 2, 5),
(115, 3, 5),
(115, 4, 5),
(116, 2, 5),
(116, 3, 5),
(116, 4, 5),
(117, 2, 5),
(117, 3, 5),
(117, 4, 5),
(118, 2, 5),
(118, 4, 5),
(119, 2, 5),
(119, 3, 5),
(119, 4, 5),
(120, 2, 5),
(120, 3, 5),
(120, 4, 5),
(121, 2, 5),
(121, 3, 5),
(121, 4, 5),
(122, 2, 5),
(122, 4, 5),
(123, 2, 5),
(123, 3, 5),
(123, 4, 5),
(124, 2, 5),
(124, 3, 5),
(124, 4, 5),
(125, 2, 5),
(125, 3, 5),
(125, 4, 5),
(126, 2, 5),
(126, 3, 5),
(126, 4, 5),
(127, 2, 5),
(127, 4, 5),
(128, 2, 5),
(128, 3, 5),
(128, 4, 5),
(129, 2, 5),
(129, 3, 5),
(129, 4, 5),
(130, 3, 5),
(130, 4, 5),
(131, 4, 5),
(132, 3, 5),
(132, 4, 5),
(133, 2, 5),
(133, 3, 5),
(133, 4, 5),
(134, 2, 5),
(134, 3, 5),
(134, 4, 5),
(135, 2, 5),
(135, 3, 5),
(135, 4, 5),
(136, 2, 5),
(136, 3, 5),
(136, 4, 5),
(137, 4, 5),
(138, 4, 5),
(139, 4, 5),
(140, 4, 5),
(141, 2, 5),
(141, 3, 5),
(141, 4, 5),
(142, 2, 5),
(142, 3, 5),
(142, 4, 5),
(143, 2, 5),
(143, 3, 5),
(143, 4, 5),
(144, 2, 5),
(144, 3, 5),
(144, 4, 5),
(145, 2, 5),
(145, 3, 5),
(145, 4, 5),
(146, 4, 5),
(147, 2, 5),
(147, 3, 5),
(147, 4, 5),
(148, 2, 5),
(148, 3, 5),
(148, 4, 5),
(149, 2, 5),
(149, 3, 5),
(149, 4, 5),
(150, 4, 5),
(151, 2, 5),
(151, 3, 5),
(151, 4, 5),
(152, 2, 5),
(152, 3, 5),
(152, 4, 5),
(153, 3, 5),
(153, 4, 5),
(154, 3, 5),
(154, 4, 5),
(155, 2, 5),
(155, 3, 5),
(155, 4, 5),
(156, 2, 5),
(156, 3, 5),
(156, 4, 5),
(157, 2, 5),
(157, 3, 5),
(157, 4, 5),
(158, 3, 5),
(158, 4, 5),
(159, 3, 5),
(159, 4, 5),
(160, 3, 5),
(160, 4, 5),
(161, 2, 5),
(161, 3, 5),
(161, 4, 5),
(162, 2, 5),
(162, 3, 5),
(162, 4, 5),
(163, 2, 5),
(163, 3, 5),
(163, 4, 5),
(164, 2, 5),
(164, 3, 5),
(164, 4, 5),
(165, 2, 5),
(165, 3, 5),
(165, 4, 5),
(166, 2, 5),
(166, 3, 5),
(166, 4, 5),
(167, 2, 5),
(167, 3, 5),
(167, 4, 5),
(168, 2, 5),
(168, 3, 5),
(168, 4, 5),
(169, 2, 5),
(169, 3, 5),
(169, 4, 5),
(170, 2, 5),
(170, 3, 5),
(170, 4, 5),
(171, 3, 5),
(171, 4, 5),
(172, 3, 5),
(172, 4, 5),
(173, 2, 5),
(173, 3, 5),
(173, 4, 5),
(174, 3, 5),
(174, 4, 5),
(175, 3, 5),
(175, 4, 5),
(176, 3, 5),
(176, 4, 5),
(177, 3, 5),
(177, 4, 5),
(178, 2, 5),
(178, 3, 5),
(178, 4, 5),
(179, 2, 5),
(179, 3, 5),
(179, 4, 5),
(180, 2, 5),
(180, 3, 5),
(180, 4, 5),
(181, 2, 5),
(181, 3, 5),
(181, 4, 5),
(182, 2, 5),
(182, 3, 5),
(182, 4, 5),
(183, 2, 5),
(183, 3, 5),
(183, 4, 5),
(184, 2, 5),
(184, 3, 5),
(184, 4, 5),
(185, 2, 5),
(185, 3, 5),
(185, 4, 5),
(186, 2, 5),
(186, 3, 5),
(186, 4, 5),
(187, 3, 5),
(187, 4, 5),
(188, 2, 5),
(188, 3, 5),
(188, 4, 5),
(189, 2, 5),
(189, 3, 5),
(189, 4, 5),
(190, 2, 5),
(190, 3, 5),
(190, 4, 5),
(191, 2, 5),
(191, 3, 5),
(191, 4, 5),
(192, 2, 5),
(192, 3, 5),
(192, 4, 5),
(193, 3, 5),
(193, 4, 5),
(194, 2, 5),
(194, 3, 5),
(194, 4, 5),
(195, 2, 5),
(195, 3, 5),
(195, 4, 5),
(196, 2, 5),
(196, 3, 5),
(196, 4, 5),
(197, 2, 5),
(197, 4, 5),
(198, 2, 5),
(198, 3, 5),
(198, 4, 5),
(199, 2, 5),
(199, 3, 5),
(199, 4, 5),
(200, 2, 5),
(200, 3, 5),
(200, 4, 5),
(201, 2, 5),
(201, 3, 5),
(201, 4, 5),
(202, 3, 5),
(202, 4, 5),
(203, 3, 5),
(203, 4, 5),
(204, 3, 5),
(204, 4, 5),
(205, 3, 5),
(205, 4, 5),
(206, 2, 5),
(206, 3, 5),
(206, 4, 5),
(207, 2, 5),
(207, 3, 5),
(207, 4, 5),
(208, 2, 5),
(208, 3, 5),
(208, 4, 5),
(209, 2, 5),
(209, 3, 5),
(209, 4, 5),
(210, 2, 5),
(210, 4, 5),
(211, 2, 5),
(211, 3, 5),
(211, 4, 5),
(212, 2, 5),
(212, 3, 5),
(212, 4, 5),
(213, 2, 5),
(213, 3, 5),
(213, 4, 5),
(214, 2, 5),
(214, 3, 5),
(214, 4, 5),
(215, 2, 5),
(215, 4, 5),
(216, 2, 5),
(216, 3, 5),
(216, 4, 5),
(217, 2, 5),
(217, 4, 5),
(218, 2, 5),
(218, 3, 5),
(218, 4, 5),
(219, 2, 5),
(219, 3, 5),
(219, 4, 5),
(220, 2, 5),
(220, 4, 5),
(221, 2, 5),
(221, 3, 5),
(221, 4, 5),
(222, 2, 5),
(222, 3, 5),
(222, 4, 5),
(223, 2, 5),
(223, 3, 5),
(223, 4, 5),
(224, 2, 5),
(224, 3, 5),
(224, 4, 5),
(225, 2, 5),
(225, 3, 5),
(225, 4, 5),
(226, 2, 5),
(226, 3, 5),
(226, 4, 5),
(227, 2, 5),
(227, 3, 5),
(227, 4, 5),
(228, 2, 5),
(228, 3, 5),
(228, 4, 5),
(229, 2, 5),
(229, 3, 5),
(229, 4, 5),
(230, 2, 5),
(230, 3, 5),
(230, 4, 5),
(231, 2, 5),
(231, 3, 5),
(231, 4, 5),
(232, 2, 5),
(232, 3, 5),
(232, 4, 5),
(233, 2, 5),
(233, 3, 5),
(233, 4, 5),
(234, 2, 5),
(234, 3, 5),
(234, 4, 5),
(235, 2, 5),
(235, 3, 5),
(235, 4, 5),
(236, 2, 5),
(236, 3, 5),
(236, 4, 5),
(237, 2, 5),
(237, 3, 5),
(237, 4, 5),
(238, 2, 5),
(238, 3, 5),
(238, 4, 5),
(239, 2, 5),
(239, 3, 5),
(239, 4, 5),
(240, 2, 5),
(240, 3, 5),
(240, 4, 5),
(241, 2, 5),
(241, 3, 5),
(241, 4, 5),
(242, 2, 5),
(242, 3, 5),
(242, 4, 5),
(243, 2, 5),
(243, 3, 5),
(243, 4, 5),
(244, 2, 5),
(244, 3, 5),
(244, 4, 5),
(245, 2, 5),
(245, 3, 5),
(245, 4, 5),
(246, 2, 5),
(246, 3, 5),
(246, 4, 5),
(247, 2, 5),
(247, 3, 5),
(247, 4, 5),
(248, 2, 5),
(248, 3, 5),
(248, 4, 5),
(249, 2, 5),
(249, 3, 5),
(249, 4, 5),
(250, 2, 5),
(250, 3, 5),
(250, 4, 5),
(251, 2, 5),
(251, 3, 5),
(251, 4, 5),
(252, 2, 5),
(252, 3, 5),
(252, 4, 5),
(253, 2, 5),
(253, 3, 5),
(253, 4, 5),
(254, 2, 5),
(254, 3, 5),
(254, 4, 5),
(255, 2, 5),
(255, 3, 5),
(255, 4, 5),
(256, 2, 5),
(256, 3, 5),
(256, 4, 5),
(257, 2, 5),
(257, 3, 5),
(257, 4, 5),
(258, 2, 5),
(258, 3, 5),
(258, 4, 5),
(259, 2, 5),
(259, 3, 5),
(259, 4, 5),
(260, 2, 5),
(260, 3, 5),
(260, 4, 5),
(261, 2, 5),
(261, 4, 5),
(262, 2, 5),
(262, 3, 5),
(262, 4, 5),
(263, 2, 5),
(263, 3, 5),
(263, 4, 5),
(264, 2, 5),
(264, 3, 5),
(264, 4, 5),
(265, 2, 5),
(265, 3, 5),
(265, 4, 5),
(266, 2, 5),
(266, 3, 5),
(266, 4, 5),
(267, 2, 5),
(267, 3, 5),
(267, 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `permission_types`
--

CREATE TABLE `permission_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_types`
--

INSERT INTO `permission_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'added', NULL, NULL),
(2, 'owned', NULL, NULL),
(3, 'both', NULL, NULL),
(4, 'all', NULL, NULL),
(5, 'none', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pinned`
--

CREATE TABLE `pinned` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `task_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `allow_purchase` tinyint(1) NOT NULL DEFAULT '0',
  `downloadable` tinyint(1) NOT NULL DEFAULT '0',
  `downloadable_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sub_category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_files`
--

CREATE TABLE `product_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_sub_category`
--

CREATE TABLE `product_sub_category` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_short_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_summary` longtext COLLATE utf8mb4_unicode_ci,
  `project_admin` int(10) UNSIGNED DEFAULT NULL,
  `start_date` date NOT NULL,
  `deadline` date DEFAULT NULL,
  `notes` longtext COLLATE utf8mb4_unicode_ci,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `team_id` int(10) UNSIGNED DEFAULT NULL,
  `feedback` mediumtext COLLATE utf8mb4_unicode_ci,
  `manual_timelog` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `client_view_task` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `allow_client_notification` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `completion_percent` tinyint(4) NOT NULL,
  `calculate_task_progress` enum('true','false') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'true',
  `project_budget` double(20,2) DEFAULT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `hours_allocated` double(8,2) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'in progress',
  `project_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` text COLLATE utf8mb4_unicode_ci,
  `public` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_name`, `project_short_code`, `project_summary`, `project_admin`, `start_date`, `deadline`, `notes`, `category_id`, `client_id`, `team_id`, `feedback`, `manual_timelog`, `client_view_task`, `allow_client_notification`, `completion_percent`, `calculate_task_progress`, `project_budget`, `currency_id`, `hours_allocated`, `status`, `project_status`, `added_by`, `last_updated_by`, `hash`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES
(35, 'dsdsadas', 'PSEOP1VE71BK', '<p>fsdfasfa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'JhOtpwMrZDECOvHtQ1MDMLkrl5bbwgsk', 0, '2022-09-22 22:09:17', '2022-09-22 22:09:17', NULL),
(76, 'sdlasndnaslk', 'PSEOP1OBIYY0', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'wfojvxRZRO8eO7AVAjeV1SUBgBUyxM3s', 0, '2022-09-23 00:44:25', '2022-09-23 00:44:25', NULL),
(77, 'sdlasndnaslk', 'PSEOP1GPAK7A', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'fjgBgoOmRGvXvtLoSD4z2bg55TNiOdHP', 0, '2022-09-23 00:45:00', '2022-09-23 00:45:00', NULL),
(78, 'sdlasndnaslk', 'PSEOP1G875HR', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'DvbOQEYbIRDo6RUwr3JyMN0I6olKdFnM', 0, '2022-09-23 00:45:12', '2022-09-23 00:45:12', NULL),
(79, 'sdlasndnaslk', 'PSEOP10MCN6V', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'ryaBnR6otvWbaZgwCVqNr5otvkPvjDtV', 0, '2022-09-23 00:47:39', '2022-09-23 00:47:39', NULL),
(80, 'sdlasndnaslk', 'PSEOP1BBJSU4', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'EeSGCxDw7qyf1eWxypkyZoAMw5Jwsr2r', 0, '2022-09-23 00:48:02', '2022-09-23 00:48:02', NULL),
(81, 'sdlasndnaslk', 'PSEOP199N3YV', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'hTxTwqv86vpexghdELOVBW1TymPfRtJy', 0, '2022-09-23 00:52:54', '2022-09-23 00:52:54', NULL),
(82, 'sdlasndnaslk', 'PSEOP1JFD9NQ', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, '0yr8vQcTMryeAKwfPiaj9Yj0GKAywko6', 0, '2022-09-23 00:53:07', '2022-09-23 00:53:07', NULL),
(83, 'sdlasndnaslk', 'PSEOP186JZX1', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'iebgbvQglEKbEaydhqTtshDyzW7hX23C', 0, '2022-09-23 00:53:21', '2022-09-23 00:53:21', NULL),
(84, 'sdlasndnaslk', 'PSEOP1LGY3MF', '<p>hiosodasdbnasbn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'PifGf5y7dDnH8kM6ufq79HotIcWFF9mK', 0, '2022-09-23 01:00:28', '2022-09-23 01:00:28', NULL),
(85, 'kndsadnaskldnaskl', 'PSEOP1L76XD5', '<p>od;asdasm;ldams</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'XuWQHqHBUGrJhIA6Q4zP5l4oGlL5Z1cE', 0, '2022-09-23 01:01:15', '2022-09-23 01:01:15', NULL),
(86, 'jklsdnaslndas', 'PSEOP1QZB63N', '<p>nklsalndlaskd</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'mZue62t74Twj8GsmgoG130CC2W6FwQXG', 0, '2022-09-23 01:04:54', '2022-09-23 01:04:54', NULL),
(87, 'kdsakjbdsjkab', 'PSEOP1UM46IY', NULL, NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'crbqQzO5BT4pP7VeUBmkIDrst20J6d0k', 0, '2022-09-23 01:07:45', '2022-09-23 01:07:45', NULL),
(88, 'kdsakjbdsjkab', 'PSEOP1EJ3LQ8', NULL, NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'QfcDLxxmOXqFXzRhkQyNKcP1yev2fC1x', 0, '2022-09-23 01:09:36', '2022-09-23 01:09:36', NULL),
(89, 'mkdsamd;lasmda', 'PSEOP1707O6K', '<p>mldmsa;;das;dasml;</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'MqcNnpjbvmMVmJSN6SFJaQwJApbrfdXp', 0, '2022-09-23 01:14:44', '2022-09-23 01:14:44', NULL),
(90, 'mkdsamd;lasmda', 'PSEOP1PITONE', '<p>mldmsa;;das;dasml;</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'm1NgDjBaY9yjGggOY7xz3Om6i4FDKBT9', 0, '2022-09-23 01:16:12', '2022-09-23 01:16:12', NULL),
(91, 'lsadlmsad;mas', 'PSEOP1XTJ5D2', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'sWCDLXaToy98EUcxitgJopJaUkhdTwza', 0, '2022-09-23 01:21:55', '2022-09-23 01:21:55', NULL),
(92, 'lsadlmsad;mas', 'PSEOP1TUPDBF', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'YBKvAn6eVKPb7XqIvhJFw1VRNFP6Amfa', 0, '2022-09-23 01:22:14', '2022-09-23 01:22:14', NULL),
(93, 'lsadlmsad;mas', 'PSEOP1VXLSRY', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'LAUlyyY6KH7JlKMDlmwTiJ2tXP27PxKO', 0, '2022-09-23 01:24:13', '2022-09-23 01:24:13', NULL),
(94, 'lsadlmsad;mas', 'PSEOP1JUSFMW', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'cyjGI8H4rZSaSjH9Z8byCG4Pwbv0a9og', 0, '2022-09-23 01:25:36', '2022-09-23 01:25:36', NULL),
(95, 'lsadlmsad;mas', 'PSEOP16A18U0', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'D5nrrRlXmvDRW9Owh0N3SJnQDGvSeZxR', 0, '2022-09-23 01:28:26', '2022-09-23 01:28:26', NULL),
(96, 'lsadlmsad;mas', 'PSEOP1YJJLQ1', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, '2pcsNDqufQrDEJsF01HoN8dO47DNuZe6', 0, '2022-09-23 01:34:17', '2022-09-23 01:34:17', NULL),
(97, 'lsadlmsad;mas', 'PSEOP1JERBUN', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, '4pfRNqCt9KgFA5bYIyQAntfCU2To9xMf', 0, '2022-09-23 01:34:32', '2022-09-23 01:34:32', NULL),
(98, 'lsadlmsad;mas', 'PSEOP1DOO5QT', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'oQMdFnwTQBWtL4vFf0PjhVVNpws3ncUV', 0, '2022-09-23 01:37:54', '2022-09-23 01:37:54', NULL),
(99, 'lsadlmsad;mas', 'PSEOP1ULAOI3', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'S42twjcgCA3DD0GfLefnpCUulUSoRsqQ', 0, '2022-09-23 01:39:27', '2022-09-23 01:39:27', NULL),
(100, 'lsadlmsad;mas', 'PSEOP1OOCS46', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'uJ7oVF5YVgUSmkVEKGnarQhjFSkEqcrM', 0, '2022-09-23 01:39:56', '2022-09-23 01:39:56', NULL),
(101, 'lsadlmsad;mas', 'PSEOP1XIQ9JH', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'JNRT2gWdO704rQCUARLpHFYUxUUIpYQj', 0, '2022-09-23 01:40:30', '2022-09-23 01:40:30', NULL),
(102, 'lsadlmsad;mas', 'PSEOP1H31JBO', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'XXxmzp2oDs2UUHqfZ8gVpDPT3gbmR4rS', 0, '2022-09-23 01:42:18', '2022-09-23 01:42:18', NULL),
(103, 'lsadlmsad;mas', 'PSEOP1OQRWSX', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'LGIrlkX2YuNNA0Qky7whqI5hCYdeD8mZ', 0, '2022-09-23 01:43:45', '2022-09-23 01:43:45', NULL),
(104, 'lsadlmsad;mas', 'PSEOP1ZBARW5', '<p>kjsdnsadnsadnsa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'inGEpR3AzIMI5blrzWOrqg8GDbLp3xEB', 0, '2022-09-23 01:43:54', '2022-09-23 01:43:54', NULL),
(105, 'jbsadnasbndla', 'PSEOP11RQJWK', '<p>kdlkasndasn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'OqrN6rHcIaAb7uQl8l47xm0yZ2bsGIRs', 0, '2022-09-23 01:44:59', '2022-09-23 01:44:59', NULL),
(106, 'knnsdnasdlkas', 'PSEOP1GOILTC', '<p>bjcxasdasbjkdjbksa</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'odHi41ScPOCIlzb1or4oVq2lkVZHh9UC', 0, '2022-09-23 01:45:34', '2022-09-23 01:45:34', NULL),
(107, 'nmkdlksandl;aksn', 'PSEOP1KJL6GA', '<p>mdsadasmldmasl;dma;slm</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'qIGbPBigpjhhpejr1i3OUe50uk6FZSOF', 0, '2022-09-23 01:46:08', '2022-09-23 01:46:08', NULL),
(108, 'asddasd', 'PSEOP1KJNSZB', '<p>dbaskdbkasdbas</p>', NULL, '2022-09-24', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, 'BYWQ8PN0S2UHJpBK709KB6Ibr0mmm0mC', 0, '2022-09-23 01:54:46', '2022-09-23 01:54:46', NULL),
(109, 'djasndlkasnd', 'PSEOP174CHZO', '<p>jsabdljkasndlkasn</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, '9rJjZ6j56aMX2sxOzuslyZyFiLyPgPq4', 0, '2022-09-23 03:40:31', '2022-09-23 03:40:31', NULL),
(110, 'jkbdbkasbdaskjbd', 'PSEOP17L9SVJ', '<p>bdaskjdaskdbaskdbaskbd</p>', NULL, '2022-09-23', NULL, NULL, NULL, NULL, NULL, NULL, 'disable', 'disable', 'disable', 0, 'true', NULL, NULL, NULL, 'not started', 'pending', 1, 1, '1I2vp8Errc7VCAXq0ohRNaDCWmTAYZoA', 0, '2022-09-23 03:46:22', '2022-09-23 03:46:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_activity`
--

CREATE TABLE `project_activity` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `activity` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_category`
--

CREATE TABLE `project_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_category`
--

INSERT INTO `project_category` (`id`, `category_name`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Contractual', 1, 1, '2022-09-21 05:08:04', '2022-09-21 05:08:04');

-- --------------------------------------------------------

--
-- Table structure for table `project_files`
--

CREATE TABLE `project_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` text COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `hourly_rate` double NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_milestones`
--

CREATE TABLE `project_milestones` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `milestone_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost` double(16,2) NOT NULL,
  `status` enum('complete','incomplete') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'incomplete',
  `invoice_created` tinyint(1) NOT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_notes`
--

CREATE TABLE `project_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `is_client_show` tinyint(1) NOT NULL DEFAULT '0',
  `ask_password` tinyint(1) NOT NULL DEFAULT '0',
  `details` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_ratings`
--

CREATE TABLE `project_ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `rating` double NOT NULL DEFAULT '0',
  `comment` text COLLATE utf8mb4_unicode_ci,
  `user_id` int(10) UNSIGNED NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_settings`
--

CREATE TABLE `project_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `send_reminder` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `remind_time` int(11) NOT NULL,
  `remind_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remind_to` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '["admins","members"]',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_settings`
--

INSERT INTO `project_settings` (`id`, `send_reminder`, `remind_time`, `remind_type`, `remind_to`, `created_at`, `updated_at`) VALUES
(1, 'no', 5, 'days', '[\"admins\",\"members\"]', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `project_status_settings`
--

CREATE TABLE `project_status_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `status_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_status` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_status_settings`
--

INSERT INTO `project_status_settings` (`id`, `status_name`, `color`, `status`, `default_status`, `created_at`, `updated_at`) VALUES
(1, 'in progress', '#00b5ff', 'active', '1', NULL, NULL),
(2, 'not started', '#616e80', 'active', '0', NULL, NULL),
(3, 'on hold', '#f5c308', 'active', '0', NULL, NULL),
(4, 'canceled', '#d21010', 'active', '0', NULL, NULL),
(5, 'finished', '#679c0d', 'active', '0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_templates`
--

CREATE TABLE `project_templates` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `project_summary` mediumtext COLLATE utf8mb4_unicode_ci,
  `notes` longtext COLLATE utf8mb4_unicode_ci,
  `feedback` mediumtext COLLATE utf8mb4_unicode_ci,
  `client_view_task` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `allow_client_notification` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `manual_timelog` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `added_by` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_template_members`
--

CREATE TABLE `project_template_members` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_template_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_template_sub_tasks`
--

CREATE TABLE `project_template_sub_tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_template_task_id` int(10) UNSIGNED NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `status` enum('incomplete','complete') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'incomplete',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_template_tasks`
--

CREATE TABLE `project_template_tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `project_template_id` int(10) UNSIGNED NOT NULL,
  `priority` enum('low','medium','high') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `project_template_task_category_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_template_task_users`
--

CREATE TABLE `project_template_task_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_template_task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_time_logs`
--

CREATE TABLE `project_time_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `task_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `memo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_hours` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_minutes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edited_by_user` int(10) UNSIGNED DEFAULT NULL,
  `hourly_rate` int(11) NOT NULL,
  `earnings` int(11) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `approved_by` int(10) UNSIGNED DEFAULT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `total_break_minutes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_time_log_breaks`
--

CREATE TABLE `project_time_log_breaks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_time_log_id` int(10) UNSIGNED DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_hours` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_minutes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_user_notes`
--

CREATE TABLE `project_user_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_note_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposals`
--

CREATE TABLE `proposals` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `valid_till` date NOT NULL,
  `sub_total` double(16,2) NOT NULL,
  `total` double(16,2) NOT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` double NOT NULL,
  `invoice_convert` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('declined','accepted','waiting') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'waiting',
  `note` mediumtext COLLATE utf8mb4_unicode_ci,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `client_comment` text COLLATE utf8mb4_unicode_ci,
  `signature_approval` tinyint(1) NOT NULL DEFAULT '1',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` text COLLATE utf8mb4_unicode_ci,
  `calculate_tax` enum('after_discount','before_discount') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'after_discount',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_items`
--

CREATE TABLE `proposal_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `proposal_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `quantity` double(16,2) NOT NULL,
  `unit_price` double(16,2) NOT NULL,
  `amount` double(16,2) NOT NULL,
  `item_summary` text COLLATE utf8mb4_unicode_ci,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_item_images`
--

CREATE TABLE `proposal_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `proposal_item_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_signs`
--

CREATE TABLE `proposal_signs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `proposal_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_templates`
--

CREATE TABLE `proposal_templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_total` double NOT NULL,
  `total` double NOT NULL,
  `currency_id` int(10) UNSIGNED DEFAULT NULL,
  `discount_type` enum('percent','fixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` double NOT NULL,
  `invoice_convert` tinyint(1) NOT NULL DEFAULT '0',
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `client_comment` text COLLATE utf8mb4_unicode_ci,
  `signature_approval` tinyint(1) NOT NULL DEFAULT '1',
  `hash` text COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_template_items`
--

CREATE TABLE `proposal_template_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `proposal_template_id` bigint(20) UNSIGNED NOT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('item','discount','tax') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'item',
  `quantity` tinyint(4) NOT NULL,
  `unit_price` double NOT NULL,
  `amount` double NOT NULL,
  `item_summary` text COLLATE utf8mb4_unicode_ci,
  `taxes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_template_item_images`
--

CREATE TABLE `proposal_template_item_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `proposal_template_item_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purpose_consent`
--

CREATE TABLE `purpose_consent` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purpose_consent_leads`
--

CREATE TABLE `purpose_consent_leads` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `purpose_consent_id` int(10) UNSIGNED NOT NULL,
  `status` enum('agree','disagree') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'agree',
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
  `additional_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purpose_consent_users`
--

CREATE TABLE `purpose_consent_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `purpose_consent_id` int(10) UNSIGNED NOT NULL,
  `status` enum('agree','disagree') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'agree',
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by_id` int(10) UNSIGNED NOT NULL,
  `additional_description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pusher_settings`
--

CREATE TABLE `pusher_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pusher_app_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pusher_app_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pusher_app_secret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pusher_cluster` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `force_tls` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `taskboard` tinyint(1) NOT NULL DEFAULT '1',
  `messages` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pusher_settings`
--

INSERT INTO `pusher_settings` (`id`, `pusher_app_id`, `pusher_app_key`, `pusher_app_secret`, `pusher_cluster`, `force_tls`, `status`, `taskboard`, `messages`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, NULL, 0, 0, 1, 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `push_notification_settings`
--

CREATE TABLE `push_notification_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `onesignal_app_id` text COLLATE utf8mb4_unicode_ci,
  `onesignal_rest_api_key` text COLLATE utf8mb4_unicode_ci,
  `notification_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `push_notification_settings`
--

INSERT INTO `push_notification_settings` (`id`, `onesignal_app_id`, `onesignal_rest_api_key`, `notification_logo`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, 'inactive', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `push_subscriptions`
--

CREATE TABLE `push_subscriptions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `endpoint` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `auth_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `p_m_assigns`
--

CREATE TABLE `p_m_assigns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pm_id` int(11) NOT NULL,
  `project_count` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_m_assigns`
--

INSERT INTO `p_m_assigns` (`id`, `pm_id`, `project_count`, `amount`, `created_at`, `updated_at`) VALUES
(14, 15, '4', '800', '2022-09-22 21:35:01', '2022-09-23 01:46:08'),
(15, 12, '3', '1200', '2022-09-22 21:35:13', '2022-09-23 01:16:12'),
(16, 11, '3', '1800', '2022-09-22 21:35:22', '2022-09-23 01:45:34'),
(17, 10, '4', '1650', '2022-09-22 21:54:58', '2022-09-23 01:54:46'),
(18, 9, '3', '1580', '2022-09-22 21:55:07', '2022-09-23 01:44:59'),
(19, 16, '2', '700', '2022-09-23 03:39:35', '2022-09-23 03:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `p_m_projects`
--

CREATE TABLE `p_m_projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pm_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('pending','approve','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `p_m_projects`
--

INSERT INTO `p_m_projects` (`id`, `pm_id`, `project_id`, `start_date`, `end_date`, `status`, `created_at`, `updated_at`) VALUES
(33, 15, 39, NULL, NULL, 'pending', '2022-09-22 22:43:31', '2022-09-22 22:43:31'),
(34, 12, 40, NULL, NULL, 'pending', '2022-09-22 22:44:01', '2022-09-22 22:44:01'),
(35, 11, 41, NULL, NULL, 'pending', '2022-09-22 22:56:16', '2022-09-22 22:56:16'),
(36, 10, 42, NULL, NULL, 'pending', '2022-09-22 22:56:54', '2022-09-22 22:56:54'),
(37, 9, 43, NULL, NULL, 'pending', '2022-09-22 22:57:32', '2022-09-22 22:57:32'),
(38, 15, 46, NULL, NULL, 'pending', '2022-09-22 23:09:18', '2022-09-22 23:09:18'),
(39, 12, 46, NULL, NULL, 'pending', '2022-09-22 23:09:18', '2022-09-22 23:09:18'),
(40, 11, 46, NULL, NULL, 'pending', '2022-09-22 23:09:18', '2022-09-22 23:09:18'),
(41, 10, 46, NULL, NULL, 'pending', '2022-09-22 23:09:18', '2022-09-22 23:09:18'),
(42, 9, 46, NULL, NULL, 'pending', '2022-09-22 23:09:18', '2022-09-22 23:09:18'),
(43, 15, 49, NULL, NULL, 'pending', '2022-09-22 23:21:29', '2022-09-22 23:21:29'),
(44, 12, 49, NULL, NULL, 'pending', '2022-09-22 23:21:29', '2022-09-22 23:21:29'),
(45, 11, 49, NULL, NULL, 'pending', '2022-09-22 23:21:29', '2022-09-22 23:21:29'),
(46, 10, 49, NULL, NULL, 'pending', '2022-09-22 23:21:29', '2022-09-22 23:21:29'),
(47, 9, 49, NULL, NULL, 'pending', '2022-09-22 23:21:29', '2022-09-22 23:21:29'),
(48, 15, 51, NULL, NULL, 'pending', '2022-09-22 23:26:27', '2022-09-22 23:26:27'),
(49, 12, 51, NULL, NULL, 'pending', '2022-09-22 23:26:27', '2022-09-22 23:26:27'),
(50, 11, 51, NULL, NULL, 'pending', '2022-09-22 23:26:27', '2022-09-22 23:26:27'),
(51, 10, 51, NULL, NULL, 'pending', '2022-09-22 23:26:27', '2022-09-22 23:26:27'),
(52, 9, 51, NULL, NULL, 'pending', '2022-09-22 23:26:27', '2022-09-22 23:26:27'),
(53, 15, 60, NULL, NULL, 'pending', '2022-09-22 23:59:11', '2022-09-22 23:59:11'),
(54, 15, 60, NULL, NULL, 'pending', '2022-09-22 23:59:11', '2022-09-22 23:59:11'),
(55, 12, 64, NULL, NULL, 'pending', '2022-09-23 00:19:50', '2022-09-23 00:19:50'),
(56, 11, 65, NULL, NULL, 'pending', '2022-09-23 00:32:04', '2022-09-23 00:32:04'),
(57, 10, 66, NULL, NULL, 'pending', '2022-09-23 00:32:35', '2022-09-23 00:32:35'),
(58, 9, 67, NULL, NULL, 'pending', '2022-09-23 00:33:40', '2022-09-23 00:33:40'),
(59, 15, 68, NULL, NULL, 'pending', '2022-09-23 00:34:43', '2022-09-23 00:34:43'),
(60, 12, 69, NULL, NULL, 'pending', '2022-09-23 00:37:25', '2022-09-23 00:37:25'),
(61, 11, 70, NULL, NULL, 'pending', '2022-09-23 00:38:23', '2022-09-23 00:38:23'),
(62, 10, 71, NULL, NULL, 'pending', '2022-09-23 00:38:52', '2022-09-23 00:38:52'),
(63, 9, 72, NULL, NULL, 'pending', '2022-09-23 00:39:46', '2022-09-23 00:39:46'),
(64, 15, 73, NULL, NULL, 'pending', '2022-09-23 00:40:14', '2022-09-23 00:40:14'),
(65, 15, 84, NULL, NULL, 'pending', '2022-09-23 01:00:28', '2022-09-23 01:00:28'),
(66, 15, 85, NULL, NULL, 'pending', '2022-09-23 01:01:15', '2022-09-23 01:01:15'),
(67, 15, 86, NULL, NULL, 'pending', '2022-09-23 01:04:54', '2022-09-23 01:04:54'),
(68, 12, 90, NULL, NULL, 'pending', '2022-09-23 01:16:12', '2022-09-23 01:16:12'),
(69, 10, 104, NULL, NULL, 'pending', '2022-09-23 01:43:54', '2022-09-23 01:43:54'),
(70, 9, 105, NULL, NULL, 'pending', '2022-09-23 01:44:59', '2022-09-23 01:44:59'),
(71, 11, 106, NULL, NULL, 'pending', '2022-09-23 01:45:34', '2022-09-23 01:45:34'),
(72, 15, 107, NULL, NULL, 'pending', '2022-09-23 01:46:08', '2022-09-23 01:46:08'),
(73, 10, 108, NULL, NULL, 'pending', '2022-09-23 01:54:46', '2022-09-23 01:54:46'),
(74, 16, 109, NULL, NULL, 'pending', '2022-09-23 03:40:31', '2022-09-23 03:40:31'),
(75, 16, 110, NULL, NULL, 'pending', '2022-09-23 03:46:22', '2022-09-23 03:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `quotations`
--

CREATE TABLE `quotations` (
  `id` int(10) UNSIGNED NOT NULL,
  `business_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `sub_total` double(8,2) NOT NULL,
  `total` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quotation_items`
--

CREATE TABLE `quotation_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `quotation_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `amount` double(8,2) NOT NULL,
  `hsn_sac_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `removal_requests`
--

CREATE TABLE `removal_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `removal_requests_lead`
--

CREATE TABLE `removal_requests_lead` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'App Administrator', 'Admin is allowed to manage everything of the app.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(2, 'employee', 'Employee', 'Employee can see tasks and projects assigned to him.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(3, 'client', 'Client', 'Client can see own tasks and projects.', '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(4, 'Project Manager', 'Project Manager', NULL, '2022-09-19 00:35:58', '2022-09-19 00:35:58');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(15, 2),
(16, 2),
(13, 3),
(14, 3),
(9, 4),
(10, 4),
(11, 4),
(12, 4),
(15, 4),
(16, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'react', '2022-09-19 00:44:40', '2022-09-19 00:44:40');

-- --------------------------------------------------------

--
-- Table structure for table `slack_settings`
--

CREATE TABLE `slack_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `slack_webhook` text COLLATE utf8mb4_unicode_ci,
  `slack_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slack_settings`
--

INSERT INTO `slack_settings` (`id`, `slack_webhook`, `slack_logo`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'inactive', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `smtp_settings`
--

CREATE TABLE `smtp_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `mail_driver` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'smtp',
  `mail_host` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'smtp.gmail.com',
  `mail_port` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '587',
  `mail_username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'youremail@gmail.com',
  `mail_password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'your password',
  `mail_from_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'your name',
  `mail_from_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'from@email.com',
  `mail_encryption` enum('tls','ssl') COLLATE utf8mb4_unicode_ci DEFAULT 'tls',
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `mail_connection` enum('sync','database') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sync',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smtp_settings`
--

INSERT INTO `smtp_settings` (`id`, `mail_driver`, `mail_host`, `mail_port`, `mail_username`, `mail_password`, `mail_from_name`, `mail_from_email`, `mail_encryption`, `verified`, `mail_connection`, `created_at`, `updated_at`) VALUES
(1, 'smtp', 'smtp.gmail.com', '465', 'sayeedseopage1@gmail.com', '5Dmark#iii', 'Seopage1', 'from@email.com', 'tls', 0, 'sync', '2022-09-19 00:15:04', '2022-09-19 00:44:23');

-- --------------------------------------------------------

--
-- Table structure for table `socials`
--

CREATE TABLE `socials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `social_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `social_service` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_auth_settings`
--

CREATE TABLE `social_auth_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `facebook_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_secret_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook_status` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `google_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_secret_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_status` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `twitter_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_secret_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_status` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `linkedin_client_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_secret_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_status` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disable',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_auth_settings`
--

INSERT INTO `social_auth_settings` (`id`, `facebook_client_id`, `facebook_secret_id`, `facebook_status`, `google_client_id`, `google_secret_id`, `google_status`, `twitter_client_id`, `twitter_secret_id`, `twitter_status`, `linkedin_client_id`, `linkedin_secret_id`, `linkedin_status`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'disable', NULL, NULL, 'disable', NULL, NULL, 'disable', NULL, NULL, 'disable', '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `sticky_notes`
--

CREATE TABLE `sticky_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `note_text` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `colour` enum('blue','yellow','red','gray','purple','green') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'blue',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sticky_notes`
--

INSERT INTO `sticky_notes` (`id`, `user_id`, `note_text`, `colour`, `created_at`, `updated_at`) VALUES
(1, 1, 'Test', 'green', '2022-09-21 05:17:41', '2022-09-21 05:17:41');

-- --------------------------------------------------------

--
-- Table structure for table `sub_tasks`
--

CREATE TABLE `sub_tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` enum('incomplete','complete') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'incomplete',
  `assigned_to` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_task_files`
--

CREATE TABLE `sub_task_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `sub_task_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taskboard_columns`
--

CREATE TABLE `taskboard_columns` (
  `id` int(10) UNSIGNED NOT NULL,
  `column_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `taskboard_columns`
--

INSERT INTO `taskboard_columns` (`id`, `column_name`, `slug`, `label_color`, `priority`, `created_at`, `updated_at`) VALUES
(1, 'Incomplete', 'incomplete', '#d21010', 1, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(2, 'To Do', 'to_do', '#f5c308', 2, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(3, 'Doing', 'doing', '#00b5ff', 3, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(4, 'Completed', 'completed', '#679c0d', 4, '2022-09-19 00:15:04', '2022-09-19 00:15:04'),
(5, 'Extra Features', 'extra_features', '#FF0000', 5, '2022-09-23 00:10:11', '2022-09-23 00:10:11');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_short_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `due_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `task_category_id` int(10) UNSIGNED DEFAULT NULL,
  `priority` enum('low','medium','high') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `status` enum('incomplete','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'incomplete',
  `board_column_id` int(10) UNSIGNED DEFAULT '1',
  `column_priority` int(11) NOT NULL,
  `completed_on` datetime DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `recurring_task_id` int(10) UNSIGNED DEFAULT NULL,
  `dependent_task_id` int(10) UNSIGNED DEFAULT NULL,
  `milestone_id` int(10) UNSIGNED DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT '0',
  `billable` tinyint(1) NOT NULL DEFAULT '1',
  `estimate_hours` int(11) NOT NULL,
  `estimate_minutes` int(11) NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `hash` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repeat` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_complete` tinyint(1) NOT NULL DEFAULT '0',
  `repeat_count` int(11) DEFAULT NULL,
  `repeat_type` enum('day','week','month','year') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'day',
  `repeat_cycles` int(11) DEFAULT NULL,
  `event_id` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_category`
--

CREATE TABLE `task_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_comments`
--

CREATE TABLE `task_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_files`
--

CREATE TABLE `task_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_history`
--

CREATE TABLE `task_history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `sub_task_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `board_column_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_labels`
--

CREATE TABLE `task_labels` (
  `id` int(10) UNSIGNED NOT NULL,
  `label_id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_label_list`
--

CREATE TABLE `task_label_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `label_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_notes`
--

CREATE TABLE `task_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_settings`
--

CREATE TABLE `task_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_category` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `project` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_to` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_by` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `make_private` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_estimate` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `hours_logged` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `custom_fields` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `copy_task_link` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `files` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_task` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_logs` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `history` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_settings`
--

INSERT INTO `task_settings` (`id`, `task_category`, `project`, `start_date`, `due_date`, `assigned_to`, `assigned_by`, `description`, `label`, `status`, `priority`, `make_private`, `time_estimate`, `hours_logged`, `custom_fields`, `copy_task_link`, `files`, `sub_task`, `comments`, `time_logs`, `notes`, `history`, `created_at`, `updated_at`) VALUES
(1, 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_users`
--

CREATE TABLE `task_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taxes`
--

CREATE TABLE `taxes` (
  `id` int(10) UNSIGNED NOT NULL,
  `tax_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate_percent` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(10) UNSIGNED NOT NULL,
  `team_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `team_name`, `parent_id`, `added_by`, `last_updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Web Development', NULL, NULL, NULL, '2022-09-19 00:38:13', '2022-09-19 00:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `theme_settings`
--

CREATE TABLE `theme_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `panel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `header_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sidebar_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sidebar_text_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `user_css` longtext COLLATE utf8mb4_unicode_ci,
  `sidebar_theme` enum('dark','light') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'dark',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `theme_settings`
--

INSERT INTO `theme_settings` (`id`, `panel`, `header_color`, `sidebar_color`, `sidebar_text_color`, `link_color`, `user_css`, `sidebar_theme`, `created_at`, `updated_at`) VALUES
(1, 'admin', '#1D82F5', '#171F29', '#99A5B5', '#F7FAFF', NULL, 'dark', '2022-09-19 00:15:06', '2022-09-19 00:28:04'),
(2, 'project_admin', '#1d82f5', '#171F29', '#99A5B5', '#F7FAFF', NULL, 'dark', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(3, 'employee', '#1D82F5', '#171F29', '#99A5B5', '#F7FAFF', NULL, 'dark', '2022-09-19 00:15:06', '2022-09-19 00:28:04'),
(4, 'client', '#1D82F5', '#171F29', '#99A5B5', '#F7FAFF', NULL, 'dark', '2022-09-19 00:15:06', '2022-09-19 00:28:04');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `subject` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('open','pending','resolved','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `priority` enum('low','medium','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `agent_id` int(10) UNSIGNED DEFAULT NULL,
  `channel_id` int(10) UNSIGNED DEFAULT NULL,
  `type_id` int(10) UNSIGNED DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` int(10) UNSIGNED DEFAULT NULL,
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_agent_groups`
--

CREATE TABLE `ticket_agent_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `agent_id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('enabled','disabled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enabled',
  `added_by` int(10) UNSIGNED DEFAULT NULL,
  `last_updated_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_channels`
--

CREATE TABLE `ticket_channels` (
  `id` int(10) UNSIGNED NOT NULL,
  `channel_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_channels`
--

INSERT INTO `ticket_channels` (`id`, `channel_name`, `created_at`, `updated_at`) VALUES
(1, 'Email', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(2, 'Phone', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(3, 'Twitter', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(4, 'Facebook', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(5, 'Sales', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(6, 'Code', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(7, 'Management', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(8, 'Question', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(9, 'Problem', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(10, 'Incident', '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(11, 'Feature Request', '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_custom_forms`
--

CREATE TABLE `ticket_custom_forms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `custom_fields_id` int(10) UNSIGNED DEFAULT NULL,
  `field_display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `field_order` int(11) NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_custom_forms`
--

INSERT INTO `ticket_custom_forms` (`id`, `custom_fields_id`, `field_display_name`, `field_name`, `field_type`, `field_order`, `status`, `required`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Name', 'name', 'text', 1, 'active', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(2, NULL, 'Email', 'email', 'text', 2, 'active', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(3, NULL, 'Ticket Subject', 'ticket_subject', 'text', 3, 'active', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(4, NULL, 'Ticket Description', 'ticket_description', 'textarea', 4, 'active', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(5, NULL, 'Type', 'type', 'select', 5, 'active', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06'),
(6, NULL, 'Priority', 'priority', 'select', 6, 'active', 0, '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_email_settings`
--

CREATE TABLE `ticket_email_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mail_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail_password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail_from_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail_from_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imap_host` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imap_port` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imap_encryption` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `sync_interval` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_email_settings`
--

INSERT INTO `ticket_email_settings` (`id`, `mail_username`, `mail_password`, `mail_from_name`, `mail_from_email`, `imap_host`, `imap_port`, `imap_encryption`, `status`, `verified`, `sync_interval`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 1, '2022-09-19 00:15:06', '2022-09-19 00:15:06');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_files`
--

CREATE TABLE `ticket_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `ticket_reply_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dropbox_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_groups`
--

CREATE TABLE `ticket_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_replies`
--

CREATE TABLE `ticket_replies` (
  `id` int(10) UNSIGNED NOT NULL,
  `ticket_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `message` mediumtext COLLATE utf8mb4_unicode_ci,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `imap_message_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imap_message_uid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imap_in_reply_to` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_reply_templates`
--

CREATE TABLE `ticket_reply_templates` (
  `id` int(10) UNSIGNED NOT NULL,
  `reply_heading` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `reply_text` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_tags`
--

CREATE TABLE `ticket_tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  `ticket_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_tag_list`
--

CREATE TABLE `ticket_tag_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `tag_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_types`
--

CREATE TABLE `ticket_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `translate_settings`
--

CREATE TABLE `translate_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `google_key` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `translate_settings`
--

INSERT INTO `translate_settings` (`id`, `google_key`, `created_at`, `updated_at`) VALUES
(1, NULL, '2022-09-19 00:15:04', '2022-09-19 00:15:04');

-- --------------------------------------------------------

--
-- Table structure for table `universal_search`
--

CREATE TABLE `universal_search` (
  `id` int(10) UNSIGNED NOT NULL,
  `searchable_id` int(11) NOT NULL,
  `module_type` enum('ticket','invoice','notice','proposal','task','creditNote','client','employee','project','estimate','lead') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `route_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `universal_search`
--

INSERT INTO `universal_search` (`id`, `searchable_id`, `module_type`, `title`, `route_name`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'SeoPAge1', 'employees.show', '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(2, 9, 'employee', 'John Doe', 'employees.show', '2022-09-19 00:44:40', '2022-09-19 00:44:40'),
(3, 10, 'employee', 'Pm2', 'employees.show', '2022-09-19 01:50:50', '2022-09-19 01:50:50'),
(4, 11, 'employee', 'pm3', 'employees.show', '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(5, 12, 'employee', 'pm4', 'employees.show', '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(6, 13, 'client', 'Client 1', 'clients.show', '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(7, 14, 'client', 'Test custom', 'clients.show', '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(8, 1, 'project', 'sadfsdsdg', 'projects.show', '2022-09-21 05:08:22', '2022-09-21 05:08:22'),
(9, 1, 'lead', 'Freealancing Client', 'leads.show', '2022-09-21 20:10:18', '2022-09-21 20:10:18'),
(10, 1, 'lead', 'company3@gmail.com', 'leads.show', '2022-09-21 20:10:18', '2022-09-21 20:10:18'),
(11, 1, 'lead', 'Test', 'leads.show', '2022-09-21 20:10:18', '2022-09-21 20:10:18'),
(12, 15, 'employee', 'Pm5', 'employees.show', '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(13, 16, 'employee', 'pm6', 'employees.show', '2022-09-23 03:39:18', '2022-09-23 03:39:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `two_factor_email_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','others') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salutation` enum('mr','mrs','miss','dr','sir','madam') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `status` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `login` enum('enable','disable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'enable',
  `onesignal_player_id` text COLLATE utf8mb4_unicode_ci,
  `last_login` timestamp NULL DEFAULT NULL,
  `email_notifications` tinyint(1) NOT NULL DEFAULT '1',
  `country_id` int(10) UNSIGNED DEFAULT NULL,
  `dark_theme` tinyint(1) NOT NULL,
  `rtl` tinyint(1) NOT NULL,
  `two_fa_verify_via` enum('email','google_authenticator','both') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'when authenticator is email',
  `two_factor_expires_at` datetime DEFAULT NULL,
  `admin_approval` tinyint(1) NOT NULL DEFAULT '1',
  `permission_sync` tinyint(1) NOT NULL DEFAULT '1',
  `google_calendar_status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed`, `two_factor_email_confirmed`, `remember_token`, `image`, `mobile`, `gender`, `salutation`, `locale`, `status`, `login`, `onesignal_player_id`, `last_login`, `email_notifications`, `country_id`, `dark_theme`, `rtl`, `two_fa_verify_via`, `two_factor_code`, `two_factor_expires_at`, `admin_approval`, `permission_sync`, `google_calendar_status`, `created_at`, `updated_at`) VALUES
(1, 'SeoPAge1', 'company@example.com', '$2y$10$FfG84wI.eH6lQD7Gkt2F4eqvBg5NKo0Snik56Vm/BoiFrl1nTJyCW', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, 'en', 'active', 'enable', NULL, '2022-09-22 20:17:33', 1, NULL, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 00:15:47', '2022-09-22 20:17:33'),
(9, 'John Doe', 'pm1@gmail.com', '$2y$10$QvYglr1GCH4gMHmPeFhXs.SNDZfR7/xsDPrPG2nfTZhT.sTX8tLiO', NULL, NULL, 0, 0, NULL, NULL, '01575202020', 'male', NULL, 'en', 'active', 'disable', NULL, NULL, 1, 18, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 00:44:40', '2022-09-19 00:44:40'),
(10, 'Pm2', 'pm2@gmail.com', '$2y$10$dSWm5Fat/cea/HYS6V8I2OVRwW59PYVD1R5eGIUtE3CWmIRf0Nrk6', NULL, NULL, 0, 0, NULL, NULL, '01575202028', 'male', NULL, 'en', 'active', 'enable', NULL, NULL, 1, 18, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 01:50:49', '2022-09-19 01:50:49'),
(11, 'pm3', 'pm3@gmail.com', '$2y$10$bKFbrB0hR8Wf/.jwenyZj.U2DRU6SVy5y0sGni2rrecXqsiM/2ztS', NULL, NULL, 0, 0, NULL, NULL, '01575202020', 'male', NULL, 'en', 'active', 'enable', NULL, NULL, 1, 18, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(12, 'pm4', 'pm4@gmail.com', '$2y$10$LlRUUJa7zq/3ofQmPbFC6.R3RjKXF6Sx.ZvhYHsqyto3vWytlGKjO', NULL, NULL, 0, 0, NULL, NULL, '01575202020', 'male', NULL, 'en', 'active', 'enable', NULL, NULL, 1, 18, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(13, 'Client 1', NULL, '$2y$10$yTLoU8tbmmRRgXu0/2yJ3.FBFUS/xhXaGKfOquc9FnU3tsPUYXzn2', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, 'mr', 'en', 'active', 'disable', NULL, NULL, 1, NULL, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(14, 'Test custom', NULL, '$2y$10$geh2brkSPUsaUfXXC88gLOoS67ESXidpkTFZYTP3HIUHPBy2Bh0zu', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, 'mr', 'en', 'active', 'disable', NULL, NULL, 0, NULL, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(15, 'Pm5', 'pm@gmail.com', '$2y$10$G60UYl5QsmMbfWzBo0qj4OKqayLp5QoUDoBP3daM92dCEOLbEZLMW', NULL, NULL, 0, 0, NULL, NULL, '01575202020', 'male', NULL, 'en', 'active', 'enable', NULL, NULL, 1, 18, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-22 04:25:56', '2022-09-22 04:25:56'),
(16, 'pm6', 'pm6@gmail.com', '$2y$10$wJwYsBWTMPLss6zyX./d.uidV39b.q63IJt9CwK6pyCZCKrzicqRa', NULL, NULL, 0, 0, NULL, NULL, '01575202020', 'male', NULL, 'en', 'active', 'enable', NULL, NULL, 1, 18, 0, 0, NULL, NULL, NULL, 1, 1, 1, '2022-09-23 03:39:16', '2022-09-23 03:39:16');

-- --------------------------------------------------------

--
-- Table structure for table `users_chat`
--

CREATE TABLE `users_chat` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_one` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `message` mediumtext COLLATE utf8mb4_unicode_ci,
  `from` int(10) UNSIGNED DEFAULT NULL,
  `to` int(10) UNSIGNED DEFAULT NULL,
  `message_seen` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_chat_files`
--

CREATE TABLE `users_chat_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `users_chat_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `google_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_link_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_activities`
--

CREATE TABLE `user_activities` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `activity` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_invitations`
--

CREATE TABLE `user_invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `invitation_type` enum('email','link') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'email',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invitation_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `email_restriction` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_leadboard_settings`
--

CREATE TABLE `user_leadboard_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `board_column_id` int(10) UNSIGNED NOT NULL,
  `collapsed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_permissions`
--

CREATE TABLE `user_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `permission_type_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_permissions`
--

INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `permission_type_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(2, 1, 2, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(3, 1, 3, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(4, 1, 4, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(5, 1, 5, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(6, 1, 6, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(7, 1, 7, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(8, 1, 8, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(9, 1, 9, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(10, 1, 10, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(11, 1, 11, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(12, 1, 12, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(13, 1, 13, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(14, 1, 14, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(15, 1, 15, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(16, 1, 16, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(17, 1, 17, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(18, 1, 18, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(19, 1, 19, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(20, 1, 20, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(21, 1, 21, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(22, 1, 22, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(23, 1, 23, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(24, 1, 24, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(25, 1, 25, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(26, 1, 26, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(27, 1, 27, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(28, 1, 28, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(29, 1, 29, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(30, 1, 30, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(31, 1, 31, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(32, 1, 32, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(33, 1, 33, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(34, 1, 34, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(35, 1, 35, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(36, 1, 36, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(37, 1, 37, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(38, 1, 38, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(39, 1, 39, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(40, 1, 40, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(41, 1, 41, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(42, 1, 42, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(43, 1, 43, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(44, 1, 44, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(45, 1, 45, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(46, 1, 46, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(47, 1, 47, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(48, 1, 48, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(49, 1, 49, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(50, 1, 50, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(51, 1, 51, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(52, 1, 52, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(53, 1, 53, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(54, 1, 54, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(55, 1, 55, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(56, 1, 56, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(57, 1, 57, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(58, 1, 58, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(59, 1, 59, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(60, 1, 60, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(61, 1, 61, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(62, 1, 62, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(63, 1, 63, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(64, 1, 64, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(65, 1, 65, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(66, 1, 66, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(67, 1, 67, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(68, 1, 68, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(69, 1, 69, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(70, 1, 70, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(71, 1, 71, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(72, 1, 72, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(73, 1, 73, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(74, 1, 74, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(75, 1, 75, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(76, 1, 76, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(77, 1, 77, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(78, 1, 78, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(79, 1, 79, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(80, 1, 80, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(81, 1, 81, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(82, 1, 82, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(83, 1, 83, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(84, 1, 84, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(85, 1, 85, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(86, 1, 86, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(87, 1, 87, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(88, 1, 88, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(89, 1, 89, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(90, 1, 90, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(91, 1, 91, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(92, 1, 92, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(93, 1, 93, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(94, 1, 94, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(95, 1, 95, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(96, 1, 96, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(97, 1, 97, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(98, 1, 98, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(99, 1, 99, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(100, 1, 100, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(101, 1, 101, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(102, 1, 102, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(103, 1, 103, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(104, 1, 104, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(105, 1, 105, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(106, 1, 106, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(107, 1, 107, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(108, 1, 108, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(109, 1, 109, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(110, 1, 110, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(111, 1, 111, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(112, 1, 112, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(113, 1, 113, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(114, 1, 114, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(115, 1, 115, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(116, 1, 116, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(117, 1, 117, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(118, 1, 118, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(119, 1, 119, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(120, 1, 120, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(121, 1, 121, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(122, 1, 122, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(123, 1, 123, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(124, 1, 124, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(125, 1, 125, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(126, 1, 126, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(127, 1, 127, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(128, 1, 128, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(129, 1, 129, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(130, 1, 130, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(131, 1, 131, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(132, 1, 132, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(133, 1, 133, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(134, 1, 134, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(135, 1, 135, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(136, 1, 136, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(137, 1, 137, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(138, 1, 138, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(139, 1, 139, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(140, 1, 140, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(141, 1, 141, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(142, 1, 142, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(143, 1, 143, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(144, 1, 144, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(145, 1, 145, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(146, 1, 146, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(147, 1, 147, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(148, 1, 148, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(149, 1, 149, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(150, 1, 150, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(151, 1, 151, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(152, 1, 152, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(153, 1, 153, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(154, 1, 154, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(155, 1, 155, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(156, 1, 156, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(157, 1, 157, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(158, 1, 158, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(159, 1, 159, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(160, 1, 160, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(161, 1, 161, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(162, 1, 162, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(163, 1, 163, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(164, 1, 164, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(165, 1, 165, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(166, 1, 166, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(167, 1, 167, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(168, 1, 168, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(169, 1, 169, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(170, 1, 170, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(171, 1, 171, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(172, 1, 172, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(173, 1, 173, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(174, 1, 174, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(175, 1, 175, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(176, 1, 176, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(177, 1, 177, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(178, 1, 178, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(179, 1, 179, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(180, 1, 180, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(181, 1, 181, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(182, 1, 182, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(183, 1, 183, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(184, 1, 184, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(185, 1, 185, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(186, 1, 186, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(187, 1, 187, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(188, 1, 188, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(189, 1, 189, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(190, 1, 190, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(191, 1, 191, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(192, 1, 192, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(193, 1, 193, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(194, 1, 194, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(195, 1, 195, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(196, 1, 196, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(197, 1, 197, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(198, 1, 198, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(199, 1, 199, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(200, 1, 200, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(201, 1, 201, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(202, 1, 202, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(203, 1, 203, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(204, 1, 204, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(205, 1, 205, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(206, 1, 206, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(207, 1, 207, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(208, 1, 208, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(209, 1, 209, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(210, 1, 210, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(211, 1, 211, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(212, 1, 212, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(213, 1, 213, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(214, 1, 214, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(215, 1, 215, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(216, 1, 216, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(217, 1, 217, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(218, 1, 218, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(219, 1, 219, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(220, 1, 220, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(221, 1, 221, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(222, 1, 222, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(223, 1, 223, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(224, 1, 224, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(225, 1, 225, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(226, 1, 226, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(227, 1, 227, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(228, 1, 228, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(229, 1, 229, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(230, 1, 230, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(231, 1, 231, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(232, 1, 232, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(233, 1, 233, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(234, 1, 234, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(235, 1, 235, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(236, 1, 236, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(237, 1, 237, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(238, 1, 238, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(239, 1, 239, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(240, 1, 240, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(241, 1, 241, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(242, 1, 242, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(243, 1, 243, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(244, 1, 244, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(245, 1, 245, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(246, 1, 246, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(247, 1, 247, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(248, 1, 248, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(249, 1, 249, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(250, 1, 250, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(251, 1, 251, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(252, 1, 252, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(253, 1, 253, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(254, 1, 254, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(255, 1, 255, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(256, 1, 256, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(257, 1, 257, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(258, 1, 258, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(259, 1, 259, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(260, 1, 260, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(261, 1, 261, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(262, 1, 262, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(263, 1, 263, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(264, 1, 264, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(265, 1, 265, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(266, 1, 266, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(267, 1, 267, 4, '2022-09-19 00:15:47', '2022-09-19 00:15:47'),
(268, 9, 1, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(269, 9, 2, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(270, 9, 3, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(271, 9, 4, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(272, 9, 5, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(273, 9, 6, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(274, 9, 7, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(275, 9, 8, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(276, 9, 9, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(277, 9, 10, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(278, 9, 11, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(279, 9, 12, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(280, 9, 13, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(281, 9, 14, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(282, 9, 15, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(283, 9, 16, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(284, 9, 17, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(285, 9, 18, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(286, 9, 19, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(287, 9, 20, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(288, 9, 21, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(289, 9, 22, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(290, 9, 23, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(291, 9, 24, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(292, 9, 25, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(293, 9, 26, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(294, 9, 27, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(295, 9, 28, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(296, 9, 29, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(297, 9, 30, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(298, 9, 31, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(299, 9, 32, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(300, 9, 33, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(301, 9, 34, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(302, 9, 35, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(303, 9, 36, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(304, 9, 37, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(305, 9, 38, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(306, 9, 39, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(307, 9, 40, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(308, 9, 41, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(309, 9, 42, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(310, 9, 43, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(311, 9, 44, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(312, 9, 45, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(313, 9, 46, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(314, 9, 47, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(315, 9, 48, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(316, 9, 49, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(317, 9, 50, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(318, 9, 51, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(319, 9, 52, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(320, 9, 53, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(321, 9, 54, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(322, 9, 55, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(323, 9, 56, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(324, 9, 57, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(325, 9, 58, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(326, 9, 59, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(327, 9, 60, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(328, 9, 61, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(329, 9, 62, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(330, 9, 63, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(331, 9, 64, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(332, 9, 65, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(333, 9, 66, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(334, 9, 67, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(335, 9, 68, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(336, 9, 69, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(337, 9, 70, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(338, 9, 71, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(339, 9, 72, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(340, 9, 73, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(341, 9, 74, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(342, 9, 75, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(343, 9, 76, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(344, 9, 77, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(345, 9, 78, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(346, 9, 79, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(347, 9, 80, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(348, 9, 81, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(349, 9, 82, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(350, 9, 83, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(351, 9, 84, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(352, 9, 85, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(353, 9, 86, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(354, 9, 87, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(355, 9, 88, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(356, 9, 89, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(357, 9, 90, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(358, 9, 91, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(359, 9, 92, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(360, 9, 93, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(361, 9, 94, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(362, 9, 95, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(363, 9, 96, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(364, 9, 97, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(365, 9, 98, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(366, 9, 99, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(367, 9, 100, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(368, 9, 101, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(369, 9, 102, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(370, 9, 103, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(371, 9, 104, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(372, 9, 105, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(373, 9, 106, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(374, 9, 107, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(375, 9, 108, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(376, 9, 109, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(377, 9, 110, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(378, 9, 111, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(379, 9, 112, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(380, 9, 113, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(381, 9, 114, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(382, 9, 115, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(383, 9, 116, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(384, 9, 117, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(385, 9, 118, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(386, 9, 119, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(387, 9, 120, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(388, 9, 121, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(389, 9, 122, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(390, 9, 123, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(391, 9, 124, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(392, 9, 125, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(393, 9, 126, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(394, 9, 127, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(395, 9, 128, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(396, 9, 129, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(397, 9, 130, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(398, 9, 131, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(399, 9, 132, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(400, 9, 133, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(401, 9, 134, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(402, 9, 135, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(403, 9, 136, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:40'),
(404, 9, 137, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(405, 9, 138, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(406, 9, 139, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(407, 9, 140, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(408, 9, 141, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(409, 9, 142, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(410, 9, 143, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(411, 9, 144, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(412, 9, 145, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(413, 9, 146, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(414, 9, 147, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(415, 9, 148, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(416, 9, 149, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(417, 9, 150, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(418, 9, 151, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(419, 9, 152, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(420, 9, 153, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(421, 9, 154, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(422, 9, 155, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(423, 9, 156, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(424, 9, 157, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(425, 9, 158, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(426, 9, 159, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(427, 9, 160, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(428, 9, 161, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(429, 9, 162, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(430, 9, 163, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(431, 9, 164, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(432, 9, 165, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(433, 9, 166, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(434, 9, 167, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(435, 9, 168, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(436, 9, 169, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(437, 9, 170, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(438, 9, 171, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(439, 9, 172, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(440, 9, 173, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(441, 9, 174, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(442, 9, 175, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(443, 9, 176, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(444, 9, 177, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(445, 9, 178, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(446, 9, 179, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(447, 9, 180, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(448, 9, 181, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(449, 9, 182, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(450, 9, 183, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(451, 9, 184, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(452, 9, 185, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(453, 9, 186, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(454, 9, 187, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(455, 9, 188, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(456, 9, 189, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(457, 9, 190, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(458, 9, 191, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(459, 9, 192, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(460, 9, 193, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(461, 9, 194, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(462, 9, 195, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(463, 9, 196, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(464, 9, 197, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(465, 9, 198, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(466, 9, 199, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(467, 9, 200, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(468, 9, 201, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(469, 9, 202, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(470, 9, 203, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(471, 9, 204, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(472, 9, 205, 5, '2022-09-19 00:44:40', '2022-09-22 21:55:07'),
(473, 9, 206, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(474, 9, 207, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(475, 9, 208, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(476, 9, 209, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(477, 9, 210, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(478, 9, 211, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(479, 9, 212, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(480, 9, 213, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(481, 9, 214, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(482, 9, 215, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(483, 9, 216, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(484, 9, 217, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(485, 9, 218, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(486, 9, 219, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(487, 9, 220, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(488, 9, 221, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(489, 9, 222, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(490, 9, 223, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(491, 9, 224, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(492, 9, 225, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(493, 9, 226, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(494, 9, 227, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(495, 9, 228, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(496, 9, 229, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(497, 9, 230, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(498, 9, 231, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(499, 9, 232, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(500, 9, 233, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(501, 9, 234, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(502, 9, 235, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(503, 9, 236, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(504, 9, 237, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(505, 9, 238, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(506, 9, 239, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(507, 9, 240, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(508, 9, 241, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(509, 9, 242, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(510, 9, 243, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(511, 9, 244, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(512, 9, 245, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(513, 9, 246, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(514, 9, 247, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(515, 9, 248, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(516, 9, 249, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(517, 9, 250, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(518, 9, 251, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(519, 9, 252, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(520, 9, 253, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(521, 9, 254, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(522, 9, 255, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(523, 9, 256, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(524, 9, 257, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(525, 9, 258, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(526, 9, 259, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(527, 9, 260, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(528, 9, 261, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(529, 9, 262, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(530, 9, 263, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(531, 9, 264, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(532, 9, 265, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(533, 9, 266, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(534, 9, 267, 5, '2022-09-19 00:44:40', '2022-09-22 01:42:41'),
(535, 10, 1, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(536, 10, 2, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(537, 10, 3, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(538, 10, 4, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(539, 10, 5, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(540, 10, 6, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(541, 10, 7, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(542, 10, 8, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(543, 10, 9, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(544, 10, 10, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(545, 10, 11, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(546, 10, 12, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(547, 10, 13, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(548, 10, 14, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(549, 10, 15, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(550, 10, 16, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(551, 10, 17, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(552, 10, 18, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(553, 10, 19, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(554, 10, 20, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(555, 10, 21, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(556, 10, 22, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(557, 10, 23, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(558, 10, 24, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(559, 10, 25, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(560, 10, 26, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(561, 10, 27, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(562, 10, 28, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(563, 10, 29, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(564, 10, 30, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(565, 10, 31, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(566, 10, 32, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(567, 10, 33, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(568, 10, 34, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(569, 10, 35, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(570, 10, 36, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(571, 10, 37, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(572, 10, 38, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(573, 10, 39, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(574, 10, 40, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(575, 10, 41, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(576, 10, 42, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(577, 10, 43, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(578, 10, 44, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(579, 10, 45, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(580, 10, 46, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(581, 10, 47, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(582, 10, 48, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(583, 10, 49, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(584, 10, 50, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(585, 10, 51, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(586, 10, 52, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(587, 10, 53, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(588, 10, 54, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(589, 10, 55, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(590, 10, 56, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(591, 10, 57, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(592, 10, 58, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(593, 10, 59, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(594, 10, 60, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(595, 10, 61, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(596, 10, 62, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(597, 10, 63, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(598, 10, 64, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(599, 10, 65, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(600, 10, 66, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(601, 10, 67, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(602, 10, 68, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(603, 10, 69, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(604, 10, 70, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(605, 10, 71, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(606, 10, 72, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(607, 10, 73, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(608, 10, 74, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(609, 10, 75, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(610, 10, 76, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(611, 10, 77, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(612, 10, 78, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(613, 10, 79, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(614, 10, 80, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(615, 10, 81, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(616, 10, 82, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(617, 10, 83, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(618, 10, 84, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(619, 10, 85, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(620, 10, 86, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(621, 10, 87, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(622, 10, 88, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(623, 10, 89, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(624, 10, 90, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(625, 10, 91, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(626, 10, 92, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(627, 10, 93, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(628, 10, 94, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(629, 10, 95, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(630, 10, 96, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(631, 10, 97, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(632, 10, 98, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(633, 10, 99, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(634, 10, 100, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(635, 10, 101, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(636, 10, 102, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(637, 10, 103, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(638, 10, 104, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(639, 10, 105, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(640, 10, 106, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(641, 10, 107, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(642, 10, 108, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(643, 10, 109, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(644, 10, 110, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(645, 10, 111, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(646, 10, 112, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(647, 10, 113, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(648, 10, 114, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(649, 10, 115, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(650, 10, 116, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(651, 10, 117, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(652, 10, 118, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(653, 10, 119, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(654, 10, 120, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(655, 10, 121, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(656, 10, 122, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(657, 10, 123, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(658, 10, 124, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(659, 10, 125, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(660, 10, 126, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(661, 10, 127, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(662, 10, 128, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(663, 10, 129, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(664, 10, 130, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(665, 10, 131, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(666, 10, 132, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(667, 10, 133, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(668, 10, 134, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(669, 10, 135, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(670, 10, 136, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(671, 10, 137, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(672, 10, 138, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(673, 10, 139, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(674, 10, 140, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(675, 10, 141, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(676, 10, 142, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(677, 10, 143, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(678, 10, 144, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(679, 10, 145, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(680, 10, 146, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(681, 10, 147, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(682, 10, 148, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(683, 10, 149, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(684, 10, 150, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(685, 10, 151, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(686, 10, 152, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(687, 10, 153, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(688, 10, 154, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(689, 10, 155, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(690, 10, 156, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(691, 10, 157, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(692, 10, 158, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(693, 10, 159, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(694, 10, 160, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(695, 10, 161, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(696, 10, 162, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(697, 10, 163, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(698, 10, 164, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(699, 10, 165, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(700, 10, 166, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(701, 10, 167, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(702, 10, 168, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(703, 10, 169, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(704, 10, 170, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:51'),
(705, 10, 171, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(706, 10, 172, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(707, 10, 173, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(708, 10, 174, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(709, 10, 175, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(710, 10, 176, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(711, 10, 177, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(712, 10, 178, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(713, 10, 179, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(714, 10, 180, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(715, 10, 181, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(716, 10, 182, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(717, 10, 183, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(718, 10, 184, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(719, 10, 185, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(720, 10, 186, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(721, 10, 187, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(722, 10, 188, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(723, 10, 189, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(724, 10, 190, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(725, 10, 191, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(726, 10, 192, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(727, 10, 193, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(728, 10, 194, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(729, 10, 195, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(730, 10, 196, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(731, 10, 197, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(732, 10, 198, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(733, 10, 199, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(734, 10, 200, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(735, 10, 201, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(736, 10, 202, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(737, 10, 203, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(738, 10, 204, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(739, 10, 205, 5, '2022-09-19 01:50:49', '2022-09-22 21:54:58'),
(740, 10, 206, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(741, 10, 207, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(742, 10, 208, 5, '2022-09-19 01:50:49', '2022-09-22 01:53:52'),
(743, 10, 209, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(744, 10, 210, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(745, 10, 211, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(746, 10, 212, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(747, 10, 213, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(748, 10, 214, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(749, 10, 215, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(750, 10, 216, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(751, 10, 217, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(752, 10, 218, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(753, 10, 219, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(754, 10, 220, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(755, 10, 221, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(756, 10, 222, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(757, 10, 223, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(758, 10, 224, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(759, 10, 225, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(760, 10, 226, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(761, 10, 227, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(762, 10, 228, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(763, 10, 229, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(764, 10, 230, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(765, 10, 231, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(766, 10, 232, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(767, 10, 233, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(768, 10, 234, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(769, 10, 235, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(770, 10, 236, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(771, 10, 237, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(772, 10, 238, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(773, 10, 239, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(774, 10, 240, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(775, 10, 241, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(776, 10, 242, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(777, 10, 243, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(778, 10, 244, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(779, 10, 245, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(780, 10, 246, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(781, 10, 247, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(782, 10, 248, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(783, 10, 249, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(784, 10, 250, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(785, 10, 251, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(786, 10, 252, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(787, 10, 253, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(788, 10, 254, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(789, 10, 255, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(790, 10, 256, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(791, 10, 257, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(792, 10, 258, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(793, 10, 259, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(794, 10, 260, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(795, 10, 261, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(796, 10, 262, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(797, 10, 263, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(798, 10, 264, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(799, 10, 265, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(800, 10, 266, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(801, 10, 267, 5, '2022-09-19 01:50:50', '2022-09-22 01:53:52'),
(802, 11, 1, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(803, 11, 2, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(804, 11, 3, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(805, 11, 4, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(806, 11, 5, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(807, 11, 6, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45');
INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `permission_type_id`, `created_at`, `updated_at`) VALUES
(808, 11, 7, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(809, 11, 8, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(810, 11, 9, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(811, 11, 10, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(812, 11, 11, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(813, 11, 12, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(814, 11, 13, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(815, 11, 14, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(816, 11, 15, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(817, 11, 16, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(818, 11, 17, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(819, 11, 18, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(820, 11, 19, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(821, 11, 20, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(822, 11, 21, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(823, 11, 22, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(824, 11, 23, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(825, 11, 24, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(826, 11, 25, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(827, 11, 26, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(828, 11, 27, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(829, 11, 28, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(830, 11, 29, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(831, 11, 30, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(832, 11, 31, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(833, 11, 32, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(834, 11, 33, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(835, 11, 34, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(836, 11, 35, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(837, 11, 36, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(838, 11, 37, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(839, 11, 38, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(840, 11, 39, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(841, 11, 40, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(842, 11, 41, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(843, 11, 42, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(844, 11, 43, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(845, 11, 44, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(846, 11, 45, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(847, 11, 46, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(848, 11, 47, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(849, 11, 48, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(850, 11, 49, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(851, 11, 50, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(852, 11, 51, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(853, 11, 52, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(854, 11, 53, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(855, 11, 54, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(856, 11, 55, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(857, 11, 56, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(858, 11, 57, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(859, 11, 58, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(860, 11, 59, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(861, 11, 60, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(862, 11, 61, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(863, 11, 62, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(864, 11, 63, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(865, 11, 64, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(866, 11, 65, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(867, 11, 66, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(868, 11, 67, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(869, 11, 68, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(870, 11, 69, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(871, 11, 70, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(872, 11, 71, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(873, 11, 72, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(874, 11, 73, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(875, 11, 74, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(876, 11, 75, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(877, 11, 76, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(878, 11, 77, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(879, 11, 78, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(880, 11, 79, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(881, 11, 80, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(882, 11, 81, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(883, 11, 82, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(884, 11, 83, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(885, 11, 84, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(886, 11, 85, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(887, 11, 86, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(888, 11, 87, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(889, 11, 88, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(890, 11, 89, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(891, 11, 90, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(892, 11, 91, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(893, 11, 92, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(894, 11, 93, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(895, 11, 94, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(896, 11, 95, 5, '2022-09-19 01:51:45', '2022-09-19 01:51:45'),
(897, 11, 96, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(898, 11, 97, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(899, 11, 98, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(900, 11, 99, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(901, 11, 100, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(902, 11, 101, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(903, 11, 102, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(904, 11, 103, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(905, 11, 104, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(906, 11, 105, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(907, 11, 106, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(908, 11, 107, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(909, 11, 108, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(910, 11, 109, 5, '2022-09-19 01:51:45', '2022-09-22 21:35:22'),
(911, 11, 110, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(912, 11, 111, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(913, 11, 112, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(914, 11, 113, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(915, 11, 114, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(916, 11, 115, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(917, 11, 116, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(918, 11, 117, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(919, 11, 118, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(920, 11, 119, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(921, 11, 120, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(922, 11, 121, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(923, 11, 122, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(924, 11, 123, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(925, 11, 124, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(926, 11, 125, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(927, 11, 126, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(928, 11, 127, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(929, 11, 128, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(930, 11, 129, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(931, 11, 130, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(932, 11, 131, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(933, 11, 132, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(934, 11, 133, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(935, 11, 134, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(936, 11, 135, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(937, 11, 136, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(938, 11, 137, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(939, 11, 138, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(940, 11, 139, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(941, 11, 140, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(942, 11, 141, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(943, 11, 142, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(944, 11, 143, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(945, 11, 144, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(946, 11, 145, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(947, 11, 146, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(948, 11, 147, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(949, 11, 148, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(950, 11, 149, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(951, 11, 150, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(952, 11, 151, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(953, 11, 152, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(954, 11, 153, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(955, 11, 154, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(956, 11, 155, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(957, 11, 156, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(958, 11, 157, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(959, 11, 158, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(960, 11, 159, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(961, 11, 160, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(962, 11, 161, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(963, 11, 162, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(964, 11, 163, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(965, 11, 164, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(966, 11, 165, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(967, 11, 166, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(968, 11, 167, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(969, 11, 168, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(970, 11, 169, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(971, 11, 170, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(972, 11, 171, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(973, 11, 172, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(974, 11, 173, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(975, 11, 174, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(976, 11, 175, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(977, 11, 176, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(978, 11, 177, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(979, 11, 178, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(980, 11, 179, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(981, 11, 180, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(982, 11, 181, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(983, 11, 182, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(984, 11, 183, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(985, 11, 184, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(986, 11, 185, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(987, 11, 186, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(988, 11, 187, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:22'),
(989, 11, 188, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(990, 11, 189, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(991, 11, 190, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(992, 11, 191, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(993, 11, 192, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(994, 11, 193, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:23'),
(995, 11, 194, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(996, 11, 195, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(997, 11, 196, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(998, 11, 197, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(999, 11, 198, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1000, 11, 199, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1001, 11, 200, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1002, 11, 201, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1003, 11, 202, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:23'),
(1004, 11, 203, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:23'),
(1005, 11, 204, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:23'),
(1006, 11, 205, 5, '2022-09-19 01:51:46', '2022-09-22 21:35:23'),
(1007, 11, 206, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1008, 11, 207, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1009, 11, 208, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1010, 11, 209, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1011, 11, 210, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1012, 11, 211, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1013, 11, 212, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1014, 11, 213, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1015, 11, 214, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1016, 11, 215, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1017, 11, 216, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1018, 11, 217, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1019, 11, 218, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1020, 11, 219, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1021, 11, 220, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1022, 11, 221, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1023, 11, 222, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1024, 11, 223, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1025, 11, 224, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1026, 11, 225, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1027, 11, 226, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1028, 11, 227, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1029, 11, 228, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1030, 11, 229, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1031, 11, 230, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1032, 11, 231, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1033, 11, 232, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1034, 11, 233, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1035, 11, 234, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1036, 11, 235, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1037, 11, 236, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1038, 11, 237, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1039, 11, 238, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1040, 11, 239, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1041, 11, 240, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1042, 11, 241, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1043, 11, 242, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1044, 11, 243, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1045, 11, 244, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1046, 11, 245, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1047, 11, 246, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1048, 11, 247, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1049, 11, 248, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1050, 11, 249, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1051, 11, 250, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1052, 11, 251, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1053, 11, 252, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1054, 11, 253, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1055, 11, 254, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1056, 11, 255, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1057, 11, 256, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1058, 11, 257, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1059, 11, 258, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1060, 11, 259, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1061, 11, 260, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1062, 11, 261, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1063, 11, 262, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1064, 11, 263, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1065, 11, 264, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1066, 11, 265, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1067, 11, 266, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1068, 11, 267, 5, '2022-09-19 01:51:46', '2022-09-19 01:51:46'),
(1069, 12, 1, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1070, 12, 2, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1071, 12, 3, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1072, 12, 4, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1073, 12, 5, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1074, 12, 6, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1075, 12, 7, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1076, 12, 8, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1077, 12, 9, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1078, 12, 10, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1079, 12, 11, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1080, 12, 12, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1081, 12, 13, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1082, 12, 14, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1083, 12, 15, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1084, 12, 16, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1085, 12, 17, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1086, 12, 18, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1087, 12, 19, 5, '2022-09-19 01:52:35', '2022-09-19 01:52:35'),
(1088, 12, 20, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1089, 12, 21, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1090, 12, 22, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1091, 12, 23, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1092, 12, 24, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1093, 12, 25, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1094, 12, 26, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1095, 12, 27, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1096, 12, 28, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1097, 12, 29, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1098, 12, 30, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1099, 12, 31, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1100, 12, 32, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1101, 12, 33, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1102, 12, 34, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1103, 12, 35, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:13'),
(1104, 12, 36, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1105, 12, 37, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1106, 12, 38, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1107, 12, 39, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1108, 12, 40, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1109, 12, 41, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1110, 12, 42, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1111, 12, 43, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1112, 12, 44, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1113, 12, 45, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1114, 12, 46, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1115, 12, 47, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1116, 12, 48, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1117, 12, 49, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1118, 12, 50, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1119, 12, 51, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1120, 12, 52, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1121, 12, 53, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1122, 12, 54, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1123, 12, 55, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1124, 12, 56, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1125, 12, 57, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1126, 12, 58, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1127, 12, 59, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1128, 12, 60, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1129, 12, 61, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1130, 12, 62, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1131, 12, 63, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1132, 12, 64, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1133, 12, 65, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1134, 12, 66, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1135, 12, 67, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1136, 12, 68, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1137, 12, 69, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1138, 12, 70, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1139, 12, 71, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1140, 12, 72, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1141, 12, 73, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1142, 12, 74, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1143, 12, 75, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1144, 12, 76, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1145, 12, 77, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1146, 12, 78, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1147, 12, 79, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1148, 12, 80, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1149, 12, 81, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1150, 12, 82, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1151, 12, 83, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1152, 12, 84, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1153, 12, 85, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1154, 12, 86, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1155, 12, 87, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1156, 12, 88, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1157, 12, 89, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1158, 12, 90, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1159, 12, 91, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1160, 12, 92, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1161, 12, 93, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1162, 12, 94, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1163, 12, 95, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1164, 12, 96, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1165, 12, 97, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1166, 12, 98, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1167, 12, 99, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1168, 12, 100, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1169, 12, 101, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1170, 12, 102, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1171, 12, 103, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1172, 12, 104, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1173, 12, 105, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1174, 12, 106, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1175, 12, 107, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1176, 12, 108, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1177, 12, 109, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1178, 12, 110, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1179, 12, 111, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1180, 12, 112, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1181, 12, 113, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1182, 12, 114, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1183, 12, 115, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1184, 12, 116, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1185, 12, 117, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1186, 12, 118, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1187, 12, 119, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1188, 12, 120, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1189, 12, 121, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1190, 12, 122, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1191, 12, 123, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1192, 12, 124, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1193, 12, 125, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1194, 12, 126, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1195, 12, 127, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1196, 12, 128, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1197, 12, 129, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1198, 12, 130, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1199, 12, 131, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1200, 12, 132, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1201, 12, 133, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1202, 12, 134, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1203, 12, 135, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1204, 12, 136, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1205, 12, 137, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1206, 12, 138, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1207, 12, 139, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1208, 12, 140, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1209, 12, 141, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1210, 12, 142, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1211, 12, 143, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1212, 12, 144, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1213, 12, 145, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1214, 12, 146, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1215, 12, 147, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1216, 12, 148, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1217, 12, 149, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1218, 12, 150, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1219, 12, 151, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1220, 12, 152, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1221, 12, 153, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1222, 12, 154, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1223, 12, 155, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1224, 12, 156, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1225, 12, 157, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1226, 12, 158, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1227, 12, 159, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1228, 12, 160, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1229, 12, 161, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1230, 12, 162, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1231, 12, 163, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1232, 12, 164, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1233, 12, 165, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1234, 12, 166, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1235, 12, 167, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1236, 12, 168, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1237, 12, 169, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1238, 12, 170, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1239, 12, 171, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1240, 12, 172, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1241, 12, 173, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1242, 12, 174, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1243, 12, 175, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1244, 12, 176, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1245, 12, 177, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1246, 12, 178, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1247, 12, 179, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1248, 12, 180, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1249, 12, 181, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1250, 12, 182, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1251, 12, 183, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1252, 12, 184, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1253, 12, 185, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1254, 12, 186, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1255, 12, 187, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1256, 12, 188, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1257, 12, 189, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1258, 12, 190, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1259, 12, 191, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1260, 12, 192, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1261, 12, 193, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1262, 12, 194, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1263, 12, 195, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1264, 12, 196, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1265, 12, 197, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1266, 12, 198, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1267, 12, 199, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1268, 12, 200, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1269, 12, 201, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1270, 12, 202, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1271, 12, 203, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1272, 12, 204, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1273, 12, 205, 5, '2022-09-19 01:52:36', '2022-09-22 21:35:14'),
(1274, 12, 206, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1275, 12, 207, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1276, 12, 208, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1277, 12, 209, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1278, 12, 210, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1279, 12, 211, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1280, 12, 212, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1281, 12, 213, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1282, 12, 214, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1283, 12, 215, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1284, 12, 216, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1285, 12, 217, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1286, 12, 218, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1287, 12, 219, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1288, 12, 220, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1289, 12, 221, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1290, 12, 222, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1291, 12, 223, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1292, 12, 224, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1293, 12, 225, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1294, 12, 226, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1295, 12, 227, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1296, 12, 228, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1297, 12, 229, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1298, 12, 230, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1299, 12, 231, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1300, 12, 232, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1301, 12, 233, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1302, 12, 234, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1303, 12, 235, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1304, 12, 236, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1305, 12, 237, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1306, 12, 238, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1307, 12, 239, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1308, 12, 240, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1309, 12, 241, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1310, 12, 242, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1311, 12, 243, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1312, 12, 244, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1313, 12, 245, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1314, 12, 246, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1315, 12, 247, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1316, 12, 248, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1317, 12, 249, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1318, 12, 250, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1319, 12, 251, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1320, 12, 252, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1321, 12, 253, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1322, 12, 254, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1323, 12, 255, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1324, 12, 256, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1325, 12, 257, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1326, 12, 258, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1327, 12, 259, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1328, 12, 260, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1329, 12, 261, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1330, 12, 262, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1331, 12, 263, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1332, 12, 264, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1333, 12, 265, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1334, 12, 266, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1335, 12, 267, 5, '2022-09-19 01:52:36', '2022-09-19 01:52:36'),
(1336, 13, 1, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1337, 13, 2, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1338, 13, 3, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1339, 13, 4, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1340, 13, 5, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1341, 13, 6, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1342, 13, 7, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1343, 13, 8, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1344, 13, 9, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1345, 13, 10, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1346, 13, 11, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1347, 13, 12, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1348, 13, 13, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1349, 13, 14, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1350, 13, 15, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1351, 13, 16, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1352, 13, 17, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1353, 13, 18, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1354, 13, 19, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1355, 13, 20, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1356, 13, 21, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1357, 13, 22, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1358, 13, 23, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1359, 13, 24, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1360, 13, 25, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1361, 13, 26, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1362, 13, 27, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1363, 13, 28, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1364, 13, 29, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1365, 13, 30, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1366, 13, 31, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1367, 13, 32, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1368, 13, 33, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1369, 13, 34, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1370, 13, 35, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1371, 13, 36, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1372, 13, 37, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1373, 13, 38, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1374, 13, 39, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1375, 13, 40, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1376, 13, 41, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1377, 13, 42, 5, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1378, 13, 43, 2, '2022-09-19 22:53:06', '2022-09-19 22:53:06'),
(1379, 13, 44, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1380, 13, 45, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1381, 13, 46, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1382, 13, 47, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1383, 13, 48, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1384, 13, 49, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1385, 13, 50, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1386, 13, 51, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1387, 13, 52, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1388, 13, 53, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1389, 13, 54, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1390, 13, 55, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1391, 13, 56, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1392, 13, 57, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1393, 13, 58, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1394, 13, 59, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1395, 13, 60, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1396, 13, 61, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1397, 13, 62, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1398, 13, 63, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1399, 13, 64, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1400, 13, 65, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1401, 13, 66, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1402, 13, 67, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1403, 13, 68, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1404, 13, 69, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1405, 13, 70, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1406, 13, 71, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1407, 13, 72, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1408, 13, 73, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1409, 13, 74, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1410, 13, 75, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1411, 13, 76, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1412, 13, 77, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1413, 13, 78, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1414, 13, 79, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1415, 13, 80, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1416, 13, 81, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1417, 13, 82, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1418, 13, 83, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1419, 13, 84, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1420, 13, 85, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1421, 13, 86, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1422, 13, 87, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1423, 13, 88, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1424, 13, 89, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1425, 13, 90, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1426, 13, 91, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1427, 13, 92, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1428, 13, 93, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1429, 13, 94, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1430, 13, 95, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1431, 13, 96, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1432, 13, 97, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1433, 13, 98, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1434, 13, 99, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1435, 13, 100, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1436, 13, 101, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1437, 13, 102, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1438, 13, 103, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1439, 13, 104, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1440, 13, 105, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1441, 13, 106, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1442, 13, 107, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1443, 13, 108, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1444, 13, 109, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1445, 13, 110, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1446, 13, 111, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1447, 13, 112, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1448, 13, 113, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1449, 13, 114, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1450, 13, 115, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1451, 13, 116, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1452, 13, 117, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1453, 13, 118, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1454, 13, 119, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1455, 13, 120, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1456, 13, 121, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1457, 13, 122, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1458, 13, 123, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1459, 13, 124, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1460, 13, 125, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1461, 13, 126, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1462, 13, 127, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1463, 13, 128, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1464, 13, 129, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1465, 13, 130, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1466, 13, 131, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1467, 13, 132, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1468, 13, 133, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1469, 13, 134, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1470, 13, 135, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1471, 13, 136, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1472, 13, 137, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1473, 13, 138, 3, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1474, 13, 139, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1475, 13, 140, 1, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1476, 13, 141, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1477, 13, 142, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1478, 13, 143, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1479, 13, 144, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1480, 13, 145, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1481, 13, 146, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1482, 13, 147, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1483, 13, 148, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1484, 13, 149, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1485, 13, 150, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1486, 13, 151, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1487, 13, 152, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1488, 13, 153, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1489, 13, 154, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1490, 13, 155, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1491, 13, 156, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1492, 13, 157, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1493, 13, 158, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1494, 13, 159, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1495, 13, 160, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1496, 13, 161, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1497, 13, 162, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1498, 13, 163, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1499, 13, 164, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1500, 13, 165, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1501, 13, 166, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1502, 13, 167, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1503, 13, 168, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1504, 13, 169, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1505, 13, 170, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1506, 13, 171, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1507, 13, 172, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1508, 13, 173, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1509, 13, 174, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1510, 13, 175, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1511, 13, 176, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1512, 13, 177, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1513, 13, 178, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1514, 13, 179, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1515, 13, 180, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1516, 13, 181, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1517, 13, 182, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1518, 13, 183, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1519, 13, 184, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1520, 13, 185, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1521, 13, 186, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1522, 13, 187, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1523, 13, 188, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1524, 13, 189, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1525, 13, 190, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1526, 13, 191, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1527, 13, 192, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1528, 13, 193, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1529, 13, 194, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1530, 13, 195, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1531, 13, 196, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1532, 13, 197, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1533, 13, 198, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1534, 13, 199, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1535, 13, 200, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1536, 13, 201, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1537, 13, 202, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1538, 13, 203, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1539, 13, 204, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1540, 13, 205, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1541, 13, 206, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1542, 13, 207, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1543, 13, 208, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1544, 13, 209, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1545, 13, 210, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1546, 13, 211, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1547, 13, 212, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1548, 13, 213, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1549, 13, 214, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1550, 13, 215, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1551, 13, 216, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1552, 13, 217, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1553, 13, 218, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1554, 13, 219, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1555, 13, 220, 4, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1556, 13, 221, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1557, 13, 222, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1558, 13, 223, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1559, 13, 224, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1560, 13, 225, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1561, 13, 226, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1562, 13, 227, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1563, 13, 228, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1564, 13, 229, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1565, 13, 230, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1566, 13, 231, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1567, 13, 232, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1568, 13, 233, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1569, 13, 234, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1570, 13, 235, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1571, 13, 236, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1572, 13, 237, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1573, 13, 238, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1574, 13, 239, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1575, 13, 240, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1576, 13, 241, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1577, 13, 242, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1578, 13, 243, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1579, 13, 244, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1580, 13, 245, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1581, 13, 246, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1582, 13, 247, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1583, 13, 248, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1584, 13, 249, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1585, 13, 250, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1586, 13, 251, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1587, 13, 252, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1588, 13, 253, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1589, 13, 254, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1590, 13, 255, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1591, 13, 256, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1592, 13, 257, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1593, 13, 258, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1594, 13, 259, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07');
INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `permission_type_id`, `created_at`, `updated_at`) VALUES
(1595, 13, 260, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1596, 13, 261, 2, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1597, 13, 262, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1598, 13, 263, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1599, 13, 264, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1600, 13, 265, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1601, 13, 266, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1602, 13, 267, 5, '2022-09-19 22:53:07', '2022-09-19 22:53:07'),
(1603, 14, 1, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1604, 14, 2, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1605, 14, 3, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1606, 14, 4, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1607, 14, 5, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1608, 14, 6, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1609, 14, 7, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1610, 14, 8, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1611, 14, 9, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1612, 14, 10, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1613, 14, 11, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1614, 14, 12, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1615, 14, 13, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1616, 14, 14, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1617, 14, 15, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1618, 14, 16, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1619, 14, 17, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1620, 14, 18, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1621, 14, 19, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1622, 14, 20, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1623, 14, 21, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1624, 14, 22, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1625, 14, 23, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1626, 14, 24, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1627, 14, 25, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1628, 14, 26, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1629, 14, 27, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1630, 14, 28, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1631, 14, 29, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1632, 14, 30, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1633, 14, 31, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1634, 14, 32, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1635, 14, 33, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1636, 14, 34, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1637, 14, 35, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1638, 14, 36, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1639, 14, 37, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1640, 14, 38, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1641, 14, 39, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1642, 14, 40, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1643, 14, 41, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1644, 14, 42, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1645, 14, 43, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1646, 14, 44, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1647, 14, 45, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1648, 14, 46, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1649, 14, 47, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1650, 14, 48, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1651, 14, 49, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1652, 14, 50, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1653, 14, 51, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1654, 14, 52, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1655, 14, 53, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1656, 14, 54, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1657, 14, 55, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1658, 14, 56, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1659, 14, 57, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1660, 14, 58, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1661, 14, 59, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1662, 14, 60, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1663, 14, 61, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1664, 14, 62, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1665, 14, 63, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1666, 14, 64, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1667, 14, 65, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1668, 14, 66, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1669, 14, 67, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1670, 14, 68, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1671, 14, 69, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1672, 14, 70, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1673, 14, 71, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1674, 14, 72, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1675, 14, 73, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1676, 14, 74, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1677, 14, 75, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1678, 14, 76, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1679, 14, 77, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1680, 14, 78, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1681, 14, 79, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1682, 14, 80, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1683, 14, 81, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1684, 14, 82, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1685, 14, 83, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1686, 14, 84, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1687, 14, 85, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1688, 14, 86, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1689, 14, 87, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1690, 14, 88, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1691, 14, 89, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1692, 14, 90, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1693, 14, 91, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1694, 14, 92, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1695, 14, 93, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1696, 14, 94, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1697, 14, 95, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1698, 14, 96, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1699, 14, 97, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1700, 14, 98, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1701, 14, 99, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1702, 14, 100, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1703, 14, 101, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1704, 14, 102, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1705, 14, 103, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1706, 14, 104, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1707, 14, 105, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1708, 14, 106, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1709, 14, 107, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1710, 14, 108, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1711, 14, 109, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1712, 14, 110, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1713, 14, 111, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1714, 14, 112, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1715, 14, 113, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1716, 14, 114, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1717, 14, 115, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1718, 14, 116, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1719, 14, 117, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1720, 14, 118, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1721, 14, 119, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1722, 14, 120, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1723, 14, 121, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1724, 14, 122, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1725, 14, 123, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1726, 14, 124, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1727, 14, 125, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1728, 14, 126, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1729, 14, 127, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1730, 14, 128, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1731, 14, 129, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1732, 14, 130, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1733, 14, 131, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1734, 14, 132, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1735, 14, 133, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1736, 14, 134, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1737, 14, 135, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1738, 14, 136, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1739, 14, 137, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1740, 14, 138, 3, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1741, 14, 139, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1742, 14, 140, 1, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1743, 14, 141, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1744, 14, 142, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1745, 14, 143, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1746, 14, 144, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1747, 14, 145, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1748, 14, 146, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1749, 14, 147, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1750, 14, 148, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1751, 14, 149, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1752, 14, 150, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1753, 14, 151, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1754, 14, 152, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1755, 14, 153, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1756, 14, 154, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1757, 14, 155, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1758, 14, 156, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1759, 14, 157, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1760, 14, 158, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1761, 14, 159, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1762, 14, 160, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1763, 14, 161, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1764, 14, 162, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1765, 14, 163, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1766, 14, 164, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1767, 14, 165, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1768, 14, 166, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1769, 14, 167, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1770, 14, 168, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1771, 14, 169, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1772, 14, 170, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1773, 14, 171, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1774, 14, 172, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1775, 14, 173, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1776, 14, 174, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1777, 14, 175, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1778, 14, 176, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1779, 14, 177, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1780, 14, 178, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1781, 14, 179, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1782, 14, 180, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1783, 14, 181, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1784, 14, 182, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1785, 14, 183, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1786, 14, 184, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1787, 14, 185, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1788, 14, 186, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1789, 14, 187, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1790, 14, 188, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1791, 14, 189, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1792, 14, 190, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1793, 14, 191, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1794, 14, 192, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1795, 14, 193, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1796, 14, 194, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1797, 14, 195, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1798, 14, 196, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1799, 14, 197, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1800, 14, 198, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1801, 14, 199, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1802, 14, 200, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1803, 14, 201, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1804, 14, 202, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1805, 14, 203, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1806, 14, 204, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1807, 14, 205, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1808, 14, 206, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1809, 14, 207, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1810, 14, 208, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1811, 14, 209, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1812, 14, 210, 2, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1813, 14, 211, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1814, 14, 212, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1815, 14, 213, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1816, 14, 214, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1817, 14, 215, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1818, 14, 216, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1819, 14, 217, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1820, 14, 218, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1821, 14, 219, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1822, 14, 220, 4, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1823, 14, 221, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1824, 14, 222, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1825, 14, 223, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1826, 14, 224, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1827, 14, 225, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1828, 14, 226, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1829, 14, 227, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1830, 14, 228, 5, '2022-09-19 23:51:56', '2022-09-19 23:51:56'),
(1831, 14, 229, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1832, 14, 230, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1833, 14, 231, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1834, 14, 232, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1835, 14, 233, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1836, 14, 234, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1837, 14, 235, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1838, 14, 236, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1839, 14, 237, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1840, 14, 238, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1841, 14, 239, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1842, 14, 240, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1843, 14, 241, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1844, 14, 242, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1845, 14, 243, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1846, 14, 244, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1847, 14, 245, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1848, 14, 246, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1849, 14, 247, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1850, 14, 248, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1851, 14, 249, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1852, 14, 250, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1853, 14, 251, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1854, 14, 252, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1855, 14, 253, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1856, 14, 254, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1857, 14, 255, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1858, 14, 256, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1859, 14, 257, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1860, 14, 258, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1861, 14, 259, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1862, 14, 260, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1863, 14, 261, 2, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1864, 14, 262, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1865, 14, 263, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1866, 14, 264, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1867, 14, 265, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1868, 14, 266, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1869, 14, 267, 5, '2022-09-19 23:51:57', '2022-09-19 23:51:57'),
(1870, 15, 1, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1871, 15, 2, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1872, 15, 3, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1873, 15, 4, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1874, 15, 5, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1875, 15, 6, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1876, 15, 7, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1877, 15, 8, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1878, 15, 9, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1879, 15, 10, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1880, 15, 11, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1881, 15, 12, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1882, 15, 13, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1883, 15, 14, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1884, 15, 15, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1885, 15, 16, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1886, 15, 17, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1887, 15, 18, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1888, 15, 19, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1889, 15, 20, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1890, 15, 21, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1891, 15, 22, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1892, 15, 23, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1893, 15, 24, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1894, 15, 25, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1895, 15, 26, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1896, 15, 27, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1897, 15, 28, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1898, 15, 29, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1899, 15, 30, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1900, 15, 31, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1901, 15, 32, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1902, 15, 33, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1903, 15, 34, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1904, 15, 35, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1905, 15, 36, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1906, 15, 37, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1907, 15, 38, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1908, 15, 39, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1909, 15, 40, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1910, 15, 41, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1911, 15, 42, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1912, 15, 43, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1913, 15, 44, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1914, 15, 45, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1915, 15, 46, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1916, 15, 47, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1917, 15, 48, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1918, 15, 49, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1919, 15, 50, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1920, 15, 51, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1921, 15, 52, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1922, 15, 53, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1923, 15, 54, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1924, 15, 55, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1925, 15, 56, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1926, 15, 57, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1927, 15, 58, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1928, 15, 59, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1929, 15, 60, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1930, 15, 61, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1931, 15, 62, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1932, 15, 63, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1933, 15, 64, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1934, 15, 65, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1935, 15, 66, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1936, 15, 67, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1937, 15, 68, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1938, 15, 69, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1939, 15, 70, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1940, 15, 71, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1941, 15, 72, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1942, 15, 73, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1943, 15, 74, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1944, 15, 75, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1945, 15, 76, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1946, 15, 77, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1947, 15, 78, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1948, 15, 79, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1949, 15, 80, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1950, 15, 81, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1951, 15, 82, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1952, 15, 83, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1953, 15, 84, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1954, 15, 85, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1955, 15, 86, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1956, 15, 87, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1957, 15, 88, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1958, 15, 89, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1959, 15, 90, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1960, 15, 91, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1961, 15, 92, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1962, 15, 93, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1963, 15, 94, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1964, 15, 95, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1965, 15, 96, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:01'),
(1966, 15, 97, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1967, 15, 98, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1968, 15, 99, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1969, 15, 100, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1970, 15, 101, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1971, 15, 102, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1972, 15, 103, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1973, 15, 104, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1974, 15, 105, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1975, 15, 106, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1976, 15, 107, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1977, 15, 108, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1978, 15, 109, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1979, 15, 110, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(1980, 15, 111, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1981, 15, 112, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1982, 15, 113, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1983, 15, 114, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1984, 15, 115, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1985, 15, 116, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1986, 15, 117, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1987, 15, 118, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1988, 15, 119, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1989, 15, 120, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1990, 15, 121, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1991, 15, 122, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1992, 15, 123, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1993, 15, 124, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1994, 15, 125, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1995, 15, 126, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1996, 15, 127, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1997, 15, 128, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1998, 15, 129, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(1999, 15, 130, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2000, 15, 131, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2001, 15, 132, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2002, 15, 133, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2003, 15, 134, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2004, 15, 135, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2005, 15, 136, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2006, 15, 137, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2007, 15, 138, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2008, 15, 139, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2009, 15, 140, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2010, 15, 141, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2011, 15, 142, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2012, 15, 143, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2013, 15, 144, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2014, 15, 145, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2015, 15, 146, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2016, 15, 147, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2017, 15, 148, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2018, 15, 149, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2019, 15, 150, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2020, 15, 151, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2021, 15, 152, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2022, 15, 153, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2023, 15, 154, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2024, 15, 155, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2025, 15, 156, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2026, 15, 157, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2027, 15, 158, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2028, 15, 159, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2029, 15, 160, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2030, 15, 161, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2031, 15, 162, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2032, 15, 163, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2033, 15, 164, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2034, 15, 165, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2035, 15, 166, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2036, 15, 167, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2037, 15, 168, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2038, 15, 169, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2039, 15, 170, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2040, 15, 171, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2041, 15, 172, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2042, 15, 173, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2043, 15, 174, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2044, 15, 175, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2045, 15, 176, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2046, 15, 177, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2047, 15, 178, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2048, 15, 179, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2049, 15, 180, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2050, 15, 181, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2051, 15, 182, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2052, 15, 183, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2053, 15, 184, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2054, 15, 185, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2055, 15, 186, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2056, 15, 187, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2057, 15, 188, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2058, 15, 189, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2059, 15, 190, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2060, 15, 191, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2061, 15, 192, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2062, 15, 193, 5, '2022-09-22 04:25:57', '2022-09-22 21:35:02'),
(2063, 15, 194, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2064, 15, 195, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2065, 15, 196, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2066, 15, 197, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2067, 15, 198, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2068, 15, 199, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2069, 15, 200, 5, '2022-09-22 04:25:57', '2022-09-22 04:25:57'),
(2070, 15, 201, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2071, 15, 202, 5, '2022-09-22 04:25:58', '2022-09-22 21:35:02'),
(2072, 15, 203, 5, '2022-09-22 04:25:58', '2022-09-22 21:35:02'),
(2073, 15, 204, 5, '2022-09-22 04:25:58', '2022-09-22 21:35:02'),
(2074, 15, 205, 5, '2022-09-22 04:25:58', '2022-09-22 21:35:02'),
(2075, 15, 206, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2076, 15, 207, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2077, 15, 208, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2078, 15, 209, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2079, 15, 210, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2080, 15, 211, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2081, 15, 212, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2082, 15, 213, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2083, 15, 214, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2084, 15, 215, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2085, 15, 216, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2086, 15, 217, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2087, 15, 218, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2088, 15, 219, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2089, 15, 220, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2090, 15, 221, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2091, 15, 222, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2092, 15, 223, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2093, 15, 224, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2094, 15, 225, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2095, 15, 226, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2096, 15, 227, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2097, 15, 228, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2098, 15, 229, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2099, 15, 230, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2100, 15, 231, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2101, 15, 232, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2102, 15, 233, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2103, 15, 234, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2104, 15, 235, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2105, 15, 236, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2106, 15, 237, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2107, 15, 238, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2108, 15, 239, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2109, 15, 240, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2110, 15, 241, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2111, 15, 242, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2112, 15, 243, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2113, 15, 244, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2114, 15, 245, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2115, 15, 246, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2116, 15, 247, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2117, 15, 248, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2118, 15, 249, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2119, 15, 250, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2120, 15, 251, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2121, 15, 252, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2122, 15, 253, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2123, 15, 254, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2124, 15, 255, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2125, 15, 256, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2126, 15, 257, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2127, 15, 258, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2128, 15, 259, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2129, 15, 260, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2130, 15, 261, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2131, 15, 262, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2132, 15, 263, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2133, 15, 264, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2134, 15, 265, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2135, 15, 266, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2136, 15, 267, 5, '2022-09-22 04:25:58', '2022-09-22 04:25:58'),
(2137, 16, 1, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2138, 16, 2, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2139, 16, 3, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2140, 16, 4, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2141, 16, 5, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2142, 16, 6, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2143, 16, 7, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2144, 16, 8, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2145, 16, 9, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2146, 16, 10, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2147, 16, 11, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2148, 16, 12, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2149, 16, 13, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2150, 16, 14, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2151, 16, 15, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2152, 16, 16, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2153, 16, 17, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2154, 16, 18, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2155, 16, 19, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2156, 16, 20, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2157, 16, 21, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2158, 16, 22, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2159, 16, 23, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2160, 16, 24, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2161, 16, 25, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2162, 16, 26, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2163, 16, 27, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2164, 16, 28, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2165, 16, 29, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2166, 16, 30, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2167, 16, 31, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2168, 16, 32, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2169, 16, 33, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2170, 16, 34, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2171, 16, 35, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:36'),
(2172, 16, 36, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2173, 16, 37, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2174, 16, 38, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2175, 16, 39, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2176, 16, 40, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2177, 16, 41, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2178, 16, 42, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2179, 16, 43, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:36'),
(2180, 16, 44, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2181, 16, 45, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2182, 16, 46, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:17'),
(2183, 16, 47, 5, '2022-09-23 03:39:17', '2022-09-23 03:39:36'),
(2184, 16, 48, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2185, 16, 49, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2186, 16, 50, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2187, 16, 51, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2188, 16, 52, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2189, 16, 53, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2190, 16, 54, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2191, 16, 55, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2192, 16, 56, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2193, 16, 57, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2194, 16, 58, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2195, 16, 59, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2196, 16, 60, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2197, 16, 61, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2198, 16, 62, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2199, 16, 63, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2200, 16, 64, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2201, 16, 65, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2202, 16, 66, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2203, 16, 67, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2204, 16, 68, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2205, 16, 69, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2206, 16, 70, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2207, 16, 71, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2208, 16, 72, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2209, 16, 73, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2210, 16, 74, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2211, 16, 75, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2212, 16, 76, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2213, 16, 77, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2214, 16, 78, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2215, 16, 79, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2216, 16, 80, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2217, 16, 81, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2218, 16, 82, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2219, 16, 83, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2220, 16, 84, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2221, 16, 85, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2222, 16, 86, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2223, 16, 87, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2224, 16, 88, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2225, 16, 89, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2226, 16, 90, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2227, 16, 91, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2228, 16, 92, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2229, 16, 93, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2230, 16, 94, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2231, 16, 95, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2232, 16, 96, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2233, 16, 97, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2234, 16, 98, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2235, 16, 99, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2236, 16, 100, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2237, 16, 101, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2238, 16, 102, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2239, 16, 103, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2240, 16, 104, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2241, 16, 105, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2242, 16, 106, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2243, 16, 107, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2244, 16, 108, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2245, 16, 109, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2246, 16, 110, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2247, 16, 111, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2248, 16, 112, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2249, 16, 113, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2250, 16, 114, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2251, 16, 115, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2252, 16, 116, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2253, 16, 117, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2254, 16, 118, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2255, 16, 119, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2256, 16, 120, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2257, 16, 121, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2258, 16, 122, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2259, 16, 123, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2260, 16, 124, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2261, 16, 125, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2262, 16, 126, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2263, 16, 127, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2264, 16, 128, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2265, 16, 129, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2266, 16, 130, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2267, 16, 131, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2268, 16, 132, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2269, 16, 133, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2270, 16, 134, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2271, 16, 135, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2272, 16, 136, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2273, 16, 137, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2274, 16, 138, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2275, 16, 139, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2276, 16, 140, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2277, 16, 141, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2278, 16, 142, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2279, 16, 143, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2280, 16, 144, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2281, 16, 145, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2282, 16, 146, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2283, 16, 147, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2284, 16, 148, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2285, 16, 149, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2286, 16, 150, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2287, 16, 151, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2288, 16, 152, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2289, 16, 153, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2290, 16, 154, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2291, 16, 155, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2292, 16, 156, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2293, 16, 157, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2294, 16, 158, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2295, 16, 159, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2296, 16, 160, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2297, 16, 161, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2298, 16, 162, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2299, 16, 163, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2300, 16, 164, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2301, 16, 165, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2302, 16, 166, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2303, 16, 167, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2304, 16, 168, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2305, 16, 169, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2306, 16, 170, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2307, 16, 171, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2308, 16, 172, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2309, 16, 173, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2310, 16, 174, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2311, 16, 175, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2312, 16, 176, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2313, 16, 177, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2314, 16, 178, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2315, 16, 179, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2316, 16, 180, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2317, 16, 181, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2318, 16, 182, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2319, 16, 183, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2320, 16, 184, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2321, 16, 185, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2322, 16, 186, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2323, 16, 187, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2324, 16, 188, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2325, 16, 189, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2326, 16, 190, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2327, 16, 191, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2328, 16, 192, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2329, 16, 193, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2330, 16, 194, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2331, 16, 195, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2332, 16, 196, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2333, 16, 197, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2334, 16, 198, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2335, 16, 199, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2336, 16, 200, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2337, 16, 201, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2338, 16, 202, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2339, 16, 203, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2340, 16, 204, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2341, 16, 205, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:36'),
(2342, 16, 206, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2343, 16, 207, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2344, 16, 208, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2345, 16, 209, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2346, 16, 210, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2347, 16, 211, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2348, 16, 212, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2349, 16, 213, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2350, 16, 214, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2351, 16, 215, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2352, 16, 216, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2353, 16, 217, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2354, 16, 218, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2355, 16, 219, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2356, 16, 220, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2357, 16, 221, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2358, 16, 222, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2359, 16, 223, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2360, 16, 224, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2361, 16, 225, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2362, 16, 226, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2363, 16, 227, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2364, 16, 228, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2365, 16, 229, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2366, 16, 230, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2367, 16, 231, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2368, 16, 232, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2369, 16, 233, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2370, 16, 234, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2371, 16, 235, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2372, 16, 236, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2373, 16, 237, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2374, 16, 238, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2375, 16, 239, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2376, 16, 240, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2377, 16, 241, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2378, 16, 242, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18');
INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `permission_type_id`, `created_at`, `updated_at`) VALUES
(2379, 16, 243, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2380, 16, 244, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2381, 16, 245, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2382, 16, 246, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2383, 16, 247, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2384, 16, 248, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2385, 16, 249, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2386, 16, 250, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2387, 16, 251, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2388, 16, 252, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2389, 16, 253, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2390, 16, 254, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2391, 16, 255, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2392, 16, 256, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2393, 16, 257, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2394, 16, 258, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2395, 16, 259, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2396, 16, 260, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2397, 16, 261, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2398, 16, 262, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2399, 16, 263, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2400, 16, 264, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2401, 16, 265, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2402, 16, 266, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18'),
(2403, 16, 267, 5, '2022-09-23 03:39:18', '2022-09-23 03:39:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_taskboard_settings`
--

CREATE TABLE `user_taskboard_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `board_column_id` int(10) UNSIGNED NOT NULL,
  `collapsed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_taskboard_settings`
--

INSERT INTO `user_taskboard_settings` (`id`, `user_id`, `board_column_id`, `collapsed`, `created_at`, `updated_at`) VALUES
(1, 9, 5, 0, '2022-09-23 00:10:11', '2022-09-23 00:10:11'),
(2, 10, 5, 0, '2022-09-23 00:10:11', '2022-09-23 00:10:11'),
(3, 11, 5, 0, '2022-09-23 00:10:11', '2022-09-23 00:10:11'),
(4, 12, 5, 0, '2022-09-23 00:10:11', '2022-09-23 00:10:11'),
(5, 15, 5, 0, '2022-09-23 00:10:11', '2022-09-23 00:10:11'),
(6, 1, 5, 0, '2022-09-23 00:10:11', '2022-09-23 00:10:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accept_estimates`
--
ALTER TABLE `accept_estimates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accept_estimates_estimate_id_foreign` (`estimate_id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendances_user_id_foreign` (`user_id`),
  ADD KEY `attendances_location_id_foreign` (`location_id`),
  ADD KEY `attendances_clock_in_time_index` (`clock_in_time`),
  ADD KEY `attendances_clock_out_time_index` (`clock_out_time`),
  ADD KEY `attendances_added_by_foreign` (`added_by`),
  ADD KEY `attendances_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `attendances_employee_shift_id_foreign` (`employee_shift_id`);

--
-- Indexes for table `attendance_settings`
--
ALTER TABLE `attendance_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendance_settings_default_employee_shift_foreign` (`default_employee_shift`);

--
-- Indexes for table `client_categories`
--
ALTER TABLE `client_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_contacts`
--
ALTER TABLE `client_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_contacts_user_id_foreign` (`user_id`),
  ADD KEY `client_contacts_added_by_foreign` (`added_by`),
  ADD KEY `client_contacts_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `client_details`
--
ALTER TABLE `client_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_details_user_id_foreign` (`user_id`),
  ADD KEY `client_details_category_id_foreign` (`category_id`),
  ADD KEY `client_details_sub_category_id_foreign` (`sub_category_id`),
  ADD KEY `client_details_added_by_foreign` (`added_by`),
  ADD KEY `client_details_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `client_docs`
--
ALTER TABLE `client_docs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_docs_user_id_foreign` (`user_id`),
  ADD KEY `client_docs_added_by_foreign` (`added_by`),
  ADD KEY `client_docs_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `client_notes`
--
ALTER TABLE `client_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_notes_client_id_foreign` (`client_id`),
  ADD KEY `client_notes_member_id_foreign` (`member_id`),
  ADD KEY `client_notes_added_by_foreign` (`added_by`),
  ADD KEY `client_notes_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `client_sub_categories`
--
ALTER TABLE `client_sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_sub_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `client_user_notes`
--
ALTER TABLE `client_user_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_user_notes_user_id_foreign` (`user_id`),
  ADD KEY `client_user_notes_client_note_id_foreign` (`client_note_id`);

--
-- Indexes for table `company_addresses`
--
ALTER TABLE `company_addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contracts_client_id_foreign` (`client_id`),
  ADD KEY `contracts_contract_type_id_foreign` (`contract_type_id`),
  ADD KEY `contracts_added_by_foreign` (`added_by`),
  ADD KEY `contracts_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `contracts_currency_id_foreign` (`currency_id`);

--
-- Indexes for table `contract_custom_forms`
--
ALTER TABLE `contract_custom_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_custom_forms_custom_fields_id_foreign` (`custom_fields_id`),
  ADD KEY `contract_custom_forms_added_by_foreign` (`added_by`),
  ADD KEY `contract_custom_forms_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `contract_discussions`
--
ALTER TABLE `contract_discussions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_discussions_contract_id_foreign` (`contract_id`),
  ADD KEY `contract_discussions_from_foreign` (`from`),
  ADD KEY `contract_discussions_added_by_foreign` (`added_by`),
  ADD KEY `contract_discussions_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `contract_files`
--
ALTER TABLE `contract_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_files_user_id_foreign` (`user_id`),
  ADD KEY `contract_files_contract_id_foreign` (`contract_id`),
  ADD KEY `contract_files_added_by_foreign` (`added_by`),
  ADD KEY `contract_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `contract_renews`
--
ALTER TABLE `contract_renews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_renews_renewed_by_foreign` (`renewed_by`),
  ADD KEY `contract_renews_contract_id_foreign` (`contract_id`),
  ADD KEY `contract_renews_added_by_foreign` (`added_by`),
  ADD KEY `contract_renews_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `contract_signs`
--
ALTER TABLE `contract_signs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_signs_contract_id_foreign` (`contract_id`);

--
-- Indexes for table `contract_templates`
--
ALTER TABLE `contract_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contract_templates_contract_type_id_foreign` (`contract_type_id`),
  ADD KEY `contract_templates_currency_id_foreign` (`currency_id`);

--
-- Indexes for table `contract_types`
--
ALTER TABLE `contract_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_user_one_foreign` (`user_one`),
  ADD KEY `conversation_user_two_foreign` (`user_two`);

--
-- Indexes for table `conversation_reply`
--
ALTER TABLE `conversation_reply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_reply_conversation_id_foreign` (`conversation_id`),
  ADD KEY `conversation_reply_user_id_foreign` (`user_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credit_notes`
--
ALTER TABLE `credit_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credit_notes_project_id_foreign` (`project_id`),
  ADD KEY `credit_notes_client_id_foreign` (`client_id`),
  ADD KEY `credit_notes_currency_id_foreign` (`currency_id`),
  ADD KEY `credit_notes_added_by_foreign` (`added_by`),
  ADD KEY `credit_notes_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `credit_note_items`
--
ALTER TABLE `credit_note_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credit_note_items_credit_note_id_foreign` (`credit_note_id`);

--
-- Indexes for table `credit_note_item_images`
--
ALTER TABLE `credit_note_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `credit_note_item_images_credit_note_item_id_foreign` (`credit_note_item_id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency_format_settings`
--
ALTER TABLE `currency_format_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_fields`
--
ALTER TABLE `custom_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_fields_custom_field_group_id_foreign` (`custom_field_group_id`);

--
-- Indexes for table `custom_fields_data`
--
ALTER TABLE `custom_fields_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_fields_data_custom_field_id_foreign` (`custom_field_id`),
  ADD KEY `custom_fields_data_model_index` (`model`);

--
-- Indexes for table `custom_field_groups`
--
ALTER TABLE `custom_field_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_field_groups_model_index` (`model`);

--
-- Indexes for table `dashboard_widgets`
--
ALTER TABLE `dashboard_widgets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `database_backups`
--
ALTER TABLE `database_backups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `database_backup_cron_settings`
--
ALTER TABLE `database_backup_cron_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deals`
--
ALTER TABLE `deals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deals_deal_id_unique` (`deal_id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `designations_added_by_foreign` (`added_by`),
  ADD KEY `designations_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `discussions`
--
ALTER TABLE `discussions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discussions_discussion_category_id_foreign` (`discussion_category_id`),
  ADD KEY `discussions_project_id_foreign` (`project_id`),
  ADD KEY `discussions_user_id_foreign` (`user_id`),
  ADD KEY `discussions_best_answer_id_foreign` (`best_answer_id`),
  ADD KEY `discussions_last_reply_by_id_foreign` (`last_reply_by_id`),
  ADD KEY `discussions_added_by_foreign` (`added_by`),
  ADD KEY `discussions_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `discussion_categories`
--
ALTER TABLE `discussion_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discussion_files`
--
ALTER TABLE `discussion_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discussion_files_user_id_foreign` (`user_id`),
  ADD KEY `discussion_files_discussion_id_foreign` (`discussion_id`),
  ADD KEY `discussion_files_discussion_reply_id_foreign` (`discussion_reply_id`);

--
-- Indexes for table `discussion_replies`
--
ALTER TABLE `discussion_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discussion_replies_discussion_id_foreign` (`discussion_id`),
  ADD KEY `discussion_replies_user_id_foreign` (`user_id`);

--
-- Indexes for table `email_notification_settings`
--
ALTER TABLE `email_notification_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emergency_contacts`
--
ALTER TABLE `emergency_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emergency_contacts_user_id_foreign` (`user_id`),
  ADD KEY `emergency_contacts_added_by_foreign` (`added_by`),
  ADD KEY `emergency_contacts_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `employee_details`
--
ALTER TABLE `employee_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_details_employee_id_unique` (`employee_id`),
  ADD UNIQUE KEY `employee_details_slack_username_unique` (`slack_username`),
  ADD KEY `employee_details_user_id_foreign` (`user_id`),
  ADD KEY `employee_details_department_id_foreign` (`department_id`),
  ADD KEY `employee_details_designation_id_foreign` (`designation_id`),
  ADD KEY `employee_details_added_by_foreign` (`added_by`),
  ADD KEY `employee_details_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `employee_details_reporting_to_foreign` (`reporting_to`);

--
-- Indexes for table `employee_docs`
--
ALTER TABLE `employee_docs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_docs_user_id_foreign` (`user_id`),
  ADD KEY `employee_docs_added_by_foreign` (`added_by`),
  ADD KEY `employee_docs_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `employee_leave_quotas`
--
ALTER TABLE `employee_leave_quotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_leave_quotas_user_id_foreign` (`user_id`),
  ADD KEY `employee_leave_quotas_leave_type_id_foreign` (`leave_type_id`);

--
-- Indexes for table `employee_shifts`
--
ALTER TABLE `employee_shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_shift_change_requests`
--
ALTER TABLE `employee_shift_change_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_shift_change_requests_shift_schedule_id_foreign` (`shift_schedule_id`),
  ADD KEY `employee_shift_change_requests_employee_shift_id_foreign` (`employee_shift_id`);

--
-- Indexes for table `employee_shift_schedules`
--
ALTER TABLE `employee_shift_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_shift_schedules_user_id_foreign` (`user_id`),
  ADD KEY `employee_shift_schedules_date_index` (`date`),
  ADD KEY `employee_shift_schedules_employee_shift_id_foreign` (`employee_shift_id`),
  ADD KEY `employee_shift_schedules_added_by_foreign` (`added_by`),
  ADD KEY `employee_shift_schedules_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `employee_skills`
--
ALTER TABLE `employee_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_skills_user_id_foreign` (`user_id`),
  ADD KEY `employee_skills_skill_id_foreign` (`skill_id`);

--
-- Indexes for table `employee_teams`
--
ALTER TABLE `employee_teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_teams_team_id_foreign` (`team_id`),
  ADD KEY `employee_teams_user_id_foreign` (`user_id`);

--
-- Indexes for table `estimates`
--
ALTER TABLE `estimates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `estimates_estimate_number_unique` (`estimate_number`),
  ADD KEY `estimates_client_id_foreign` (`client_id`),
  ADD KEY `estimates_currency_id_foreign` (`currency_id`),
  ADD KEY `estimates_added_by_foreign` (`added_by`),
  ADD KEY `estimates_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `estimate_items`
--
ALTER TABLE `estimate_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estimate_items_estimate_id_foreign` (`estimate_id`);

--
-- Indexes for table `estimate_item_images`
--
ALTER TABLE `estimate_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estimate_item_images_estimate_item_id_foreign` (`estimate_item_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_added_by_foreign` (`added_by`),
  ADD KEY `events_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `event_attendees`
--
ALTER TABLE `event_attendees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_attendees_user_id_foreign` (`user_id`),
  ADD KEY `event_attendees_event_id_foreign` (`event_id`);

--
-- Indexes for table `event_files`
--
ALTER TABLE `event_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_files_event_id_foreign` (`event_id`),
  ADD KEY `event_files_added_by_foreign` (`added_by`),
  ADD KEY `event_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_currency_id_foreign` (`currency_id`),
  ADD KEY `expenses_user_id_foreign` (`user_id`),
  ADD KEY `expenses_category_id_foreign` (`category_id`),
  ADD KEY `expenses_expenses_recurring_id_foreign` (`expenses_recurring_id`),
  ADD KEY `expenses_created_by_foreign` (`created_by`),
  ADD KEY `expenses_added_by_foreign` (`added_by`),
  ADD KEY `expenses_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `expenses_approver_id_foreign` (`approver_id`);

--
-- Indexes for table `expenses_category`
--
ALTER TABLE `expenses_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_category_added_by_foreign` (`added_by`),
  ADD KEY `expenses_category_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `expenses_category_roles`
--
ALTER TABLE `expenses_category_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_category_roles_expenses_category_id_foreign` (`expenses_category_id`),
  ADD KEY `expenses_category_roles_role_id_foreign` (`role_id`);

--
-- Indexes for table `expenses_recurring`
--
ALTER TABLE `expenses_recurring`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_recurring_category_id_foreign` (`category_id`),
  ADD KEY `expenses_recurring_currency_id_foreign` (`currency_id`),
  ADD KEY `expenses_recurring_project_id_foreign` (`project_id`),
  ADD KEY `expenses_recurring_user_id_foreign` (`user_id`),
  ADD KEY `expenses_recurring_created_by_foreign` (`created_by`),
  ADD KEY `expenses_recurring_added_by_foreign` (`added_by`),
  ADD KEY `expenses_recurring_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `file_storage`
--
ALTER TABLE `file_storage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file_storage_settings`
--
ALTER TABLE `file_storage_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flags`
--
ALTER TABLE `flags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gdpr_settings`
--
ALTER TABLE `gdpr_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `google_calendar_modules`
--
ALTER TABLE `google_calendar_modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `holidays_date_index` (`date`),
  ADD KEY `holidays_added_by_foreign` (`added_by`),
  ADD KEY `holidays_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoice_number_unique` (`invoice_number`),
  ADD KEY `invoices_project_id_foreign` (`project_id`),
  ADD KEY `invoices_client_id_foreign` (`client_id`),
  ADD KEY `invoices_order_id_foreign` (`order_id`),
  ADD KEY `invoices_due_date_index` (`due_date`),
  ADD KEY `invoices_currency_id_foreign` (`currency_id`),
  ADD KEY `invoices_estimate_id_foreign` (`estimate_id`),
  ADD KEY `invoices_parent_id_foreign` (`parent_id`),
  ADD KEY `invoices_invoice_recurring_id_foreign` (`invoice_recurring_id`),
  ADD KEY `invoices_created_by_foreign` (`created_by`),
  ADD KEY `invoices_added_by_foreign` (`added_by`),
  ADD KEY `invoices_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `invoices_company_address_id_foreign` (`company_address_id`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `invoice_item_images`
--
ALTER TABLE `invoice_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_item_images_invoice_item_id_foreign` (`invoice_item_id`);

--
-- Indexes for table `invoice_recurring`
--
ALTER TABLE `invoice_recurring`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_recurring_currency_id_foreign` (`currency_id`),
  ADD KEY `invoice_recurring_project_id_foreign` (`project_id`),
  ADD KEY `invoice_recurring_client_id_foreign` (`client_id`),
  ADD KEY `invoice_recurring_user_id_foreign` (`user_id`),
  ADD KEY `invoice_recurring_created_by_foreign` (`created_by`),
  ADD KEY `invoice_recurring_added_by_foreign` (`added_by`),
  ADD KEY `invoice_recurring_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `invoice_recurring_items`
--
ALTER TABLE `invoice_recurring_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_recurring_items_invoice_recurring_id_foreign` (`invoice_recurring_id`);

--
-- Indexes for table `invoice_recurring_item_images`
--
ALTER TABLE `invoice_recurring_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_recurring_item_images_invoice_recurring_item_id_foreign` (`invoice_recurring_item_id`);

--
-- Indexes for table `invoice_settings`
--
ALTER TABLE `invoice_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issues_user_id_foreign` (`user_id`),
  ADD KEY `issues_project_id_foreign` (`project_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knowledge_bases`
--
ALTER TABLE `knowledge_bases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `knowledge_bases_category_id_foreign` (`category_id`);

--
-- Indexes for table `knowledge_base_files`
--
ALTER TABLE `knowledge_base_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `knowledge_base_files_knowledge_base_id_foreign` (`knowledge_base_id`),
  ADD KEY `knowledge_base_files_added_by_foreign` (`added_by`),
  ADD KEY `knowledge_base_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `knowledge_categories`
--
ALTER TABLE `knowledge_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `language_settings`
--
ALTER TABLE `language_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leads_agent_id_foreign` (`agent_id`),
  ADD KEY `leads_currency_id_foreign` (`currency_id`),
  ADD KEY `leads_category_id_foreign` (`category_id`),
  ADD KEY `leads_added_by_foreign` (`added_by`),
  ADD KEY `leads_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_agents`
--
ALTER TABLE `lead_agents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_agents_user_id_foreign` (`user_id`),
  ADD KEY `lead_agents_added_by_foreign` (`added_by`),
  ADD KEY `lead_agents_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_category`
--
ALTER TABLE `lead_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_category_added_by_foreign` (`added_by`),
  ADD KEY `lead_category_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_custom_forms`
--
ALTER TABLE `lead_custom_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_custom_forms_custom_fields_id_foreign` (`custom_fields_id`),
  ADD KEY `lead_custom_forms_added_by_foreign` (`added_by`),
  ADD KEY `lead_custom_forms_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_files`
--
ALTER TABLE `lead_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_files_lead_id_foreign` (`lead_id`),
  ADD KEY `lead_files_user_id_foreign` (`user_id`),
  ADD KEY `lead_files_added_by_foreign` (`added_by`),
  ADD KEY `lead_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_follow_up`
--
ALTER TABLE `lead_follow_up`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_follow_up_lead_id_foreign` (`lead_id`),
  ADD KEY `lead_follow_up_added_by_foreign` (`added_by`),
  ADD KEY `lead_follow_up_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_notes`
--
ALTER TABLE `lead_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_notes_lead_id_foreign` (`lead_id`),
  ADD KEY `lead_notes_member_id_foreign` (`member_id`),
  ADD KEY `lead_notes_added_by_foreign` (`added_by`),
  ADD KEY `lead_notes_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_sources`
--
ALTER TABLE `lead_sources`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lead_sources_type_unique` (`type`),
  ADD KEY `lead_sources_added_by_foreign` (`added_by`),
  ADD KEY `lead_sources_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `lead_status`
--
ALTER TABLE `lead_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lead_status_type_unique` (`type`);

--
-- Indexes for table `lead_user_notes`
--
ALTER TABLE `lead_user_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_user_notes_user_id_foreign` (`user_id`),
  ADD KEY `lead_user_notes_lead_note_id_foreign` (`lead_note_id`);

--
-- Indexes for table `leaves`
--
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaves_user_id_foreign` (`user_id`),
  ADD KEY `leaves_leave_type_id_foreign` (`leave_type_id`),
  ADD KEY `leaves_leave_date_index` (`leave_date`),
  ADD KEY `leaves_added_by_foreign` (`added_by`),
  ADD KEY `leaves_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `leaves_approved_by_foreign` (`approved_by`);

--
-- Indexes for table `leave_types`
--
ALTER TABLE `leave_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_time_for`
--
ALTER TABLE `log_time_for`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ltm_translations`
--
ALTER TABLE `ltm_translations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_settings`
--
ALTER TABLE `menu_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_settings`
--
ALTER TABLE `message_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `module_settings`
--
ALTER TABLE `module_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notices_department_id_foreign` (`department_id`),
  ADD KEY `notices_added_by_foreign` (`added_by`),
  ADD KEY `notices_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `notice_views`
--
ALTER TABLE `notice_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notice_views_notice_id_foreign` (`notice_id`),
  ADD KEY `notice_views_user_id_foreign` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `offline_payment_methods`
--
ALTER TABLE `offline_payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_client_id_foreign` (`client_id`),
  ADD KEY `orders_currency_id_foreign` (`currency_id`),
  ADD KEY `orders_added_by_foreign` (`added_by`),
  ADD KEY `orders_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `orders_company_address_id_foreign` (`company_address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `order_item_images`
--
ALTER TABLE `order_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_item_images_order_item_id_index` (`order_item_id`);

--
-- Indexes for table `organisation_settings`
--
ALTER TABLE `organisation_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organisation_settings_currency_id_foreign` (`currency_id`),
  ADD KEY `organisation_settings_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `organisation_settings_default_task_status_foreign` (`default_task_status`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_transaction_id_unique` (`transaction_id`),
  ADD UNIQUE KEY `payments_plan_id_unique` (`plan_id`),
  ADD UNIQUE KEY `payments_event_id_unique` (`event_id`),
  ADD KEY `payments_project_id_foreign` (`project_id`),
  ADD KEY `payments_invoice_id_foreign` (`invoice_id`),
  ADD KEY `payments_order_id_foreign` (`order_id`),
  ADD KEY `payments_credit_notes_id_foreign` (`credit_notes_id`),
  ADD KEY `payments_currency_id_foreign` (`currency_id`),
  ADD KEY `payments_paid_on_index` (`paid_on`),
  ADD KEY `payments_offline_method_id_foreign` (`offline_method_id`),
  ADD KEY `payments_added_by_foreign` (`added_by`),
  ADD KEY `payments_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `payment_gateway_credentials`
--
ALTER TABLE `payment_gateway_credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`),
  ADD KEY `permissions_module_id_foreign` (`module_id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`),
  ADD KEY `permission_role_permission_type_id_foreign` (`permission_type_id`);

--
-- Indexes for table `permission_types`
--
ALTER TABLE `permission_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pinned`
--
ALTER TABLE `pinned`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pinned_project_id_foreign` (`project_id`),
  ADD KEY `pinned_task_id_foreign` (`task_id`),
  ADD KEY `pinned_user_id_foreign` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_sub_category_id_foreign` (`sub_category_id`),
  ADD KEY `products_added_by_foreign` (`added_by`),
  ADD KEY `products_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_files`
--
ALTER TABLE `product_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_files_product_id_foreign` (`product_id`),
  ADD KEY `product_files_added_by_foreign` (`added_by`),
  ADD KEY `product_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `product_sub_category`
--
ALTER TABLE `product_sub_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sub_category_category_id_foreign` (`category_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_project_admin_foreign` (`project_admin`),
  ADD KEY `projects_category_id_foreign` (`category_id`),
  ADD KEY `projects_client_id_foreign` (`client_id`),
  ADD KEY `projects_team_id_foreign` (`team_id`),
  ADD KEY `projects_currency_id_foreign` (`currency_id`),
  ADD KEY `projects_added_by_foreign` (`added_by`),
  ADD KEY `projects_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `projects_deleted_at_index` (`deleted_at`);

--
-- Indexes for table `project_activity`
--
ALTER TABLE `project_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_activity_project_id_foreign` (`project_id`),
  ADD KEY `project_activity_created_at_index` (`created_at`);

--
-- Indexes for table `project_category`
--
ALTER TABLE `project_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_category_added_by_foreign` (`added_by`),
  ADD KEY `project_category_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_files`
--
ALTER TABLE `project_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_files_user_id_foreign` (`user_id`),
  ADD KEY `project_files_project_id_foreign` (`project_id`),
  ADD KEY `project_files_added_by_foreign` (`added_by`),
  ADD KEY `project_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_members_user_id_foreign` (`user_id`),
  ADD KEY `project_members_project_id_foreign` (`project_id`),
  ADD KEY `project_members_added_by_foreign` (`added_by`),
  ADD KEY `project_members_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_milestones`
--
ALTER TABLE `project_milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_milestones_project_id_foreign` (`project_id`),
  ADD KEY `project_milestones_currency_id_foreign` (`currency_id`),
  ADD KEY `project_milestones_added_by_foreign` (`added_by`),
  ADD KEY `project_milestones_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_notes`
--
ALTER TABLE `project_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_notes_project_id_foreign` (`project_id`),
  ADD KEY `project_notes_client_id_foreign` (`client_id`),
  ADD KEY `project_notes_added_by_foreign` (`added_by`),
  ADD KEY `project_notes_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_ratings`
--
ALTER TABLE `project_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_ratings_project_id_foreign` (`project_id`),
  ADD KEY `project_ratings_user_id_foreign` (`user_id`),
  ADD KEY `project_ratings_added_by_foreign` (`added_by`),
  ADD KEY `project_ratings_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_settings`
--
ALTER TABLE `project_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_status_settings`
--
ALTER TABLE `project_status_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_templates`
--
ALTER TABLE `project_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_templates_category_id_foreign` (`category_id`),
  ADD KEY `project_templates_client_id_foreign` (`client_id`);

--
-- Indexes for table `project_template_members`
--
ALTER TABLE `project_template_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_template_members_user_id_foreign` (`user_id`),
  ADD KEY `project_template_members_project_template_id_foreign` (`project_template_id`);

--
-- Indexes for table `project_template_sub_tasks`
--
ALTER TABLE `project_template_sub_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_template_sub_tasks_project_template_task_id_foreign` (`project_template_task_id`);

--
-- Indexes for table `project_template_tasks`
--
ALTER TABLE `project_template_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_template_tasks_project_template_id_foreign` (`project_template_id`),
  ADD KEY `project_template_tasks_project_template_task_category_id_foreign` (`project_template_task_category_id`);

--
-- Indexes for table `project_template_task_users`
--
ALTER TABLE `project_template_task_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_template_task_users_project_template_task_id_foreign` (`project_template_task_id`),
  ADD KEY `project_template_task_users_user_id_foreign` (`user_id`);

--
-- Indexes for table `project_time_logs`
--
ALTER TABLE `project_time_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_time_logs_project_id_foreign` (`project_id`),
  ADD KEY `project_time_logs_task_id_foreign` (`task_id`),
  ADD KEY `project_time_logs_user_id_foreign` (`user_id`),
  ADD KEY `project_time_logs_start_time_index` (`start_time`),
  ADD KEY `project_time_logs_end_time_index` (`end_time`),
  ADD KEY `project_time_logs_edited_by_user_foreign` (`edited_by_user`),
  ADD KEY `project_time_logs_approved_by_foreign` (`approved_by`),
  ADD KEY `project_time_logs_invoice_id_foreign` (`invoice_id`),
  ADD KEY `project_time_logs_added_by_foreign` (`added_by`),
  ADD KEY `project_time_logs_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_time_log_breaks`
--
ALTER TABLE `project_time_log_breaks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_time_log_breaks_project_time_log_id_foreign` (`project_time_log_id`),
  ADD KEY `project_time_log_breaks_start_time_index` (`start_time`),
  ADD KEY `project_time_log_breaks_end_time_index` (`end_time`),
  ADD KEY `project_time_log_breaks_added_by_foreign` (`added_by`),
  ADD KEY `project_time_log_breaks_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `project_user_notes`
--
ALTER TABLE `project_user_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_user_notes_user_id_foreign` (`user_id`),
  ADD KEY `project_user_notes_project_note_id_foreign` (`project_note_id`);

--
-- Indexes for table `proposals`
--
ALTER TABLE `proposals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposals_lead_id_foreign` (`lead_id`),
  ADD KEY `proposals_currency_id_foreign` (`currency_id`),
  ADD KEY `proposals_added_by_foreign` (`added_by`),
  ADD KEY `proposals_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `proposal_items`
--
ALTER TABLE `proposal_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposal_items_proposal_id_foreign` (`proposal_id`);

--
-- Indexes for table `proposal_item_images`
--
ALTER TABLE `proposal_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposal_item_images_proposal_item_id_foreign` (`proposal_item_id`);

--
-- Indexes for table `proposal_signs`
--
ALTER TABLE `proposal_signs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposal_signs_proposal_id_foreign` (`proposal_id`);

--
-- Indexes for table `proposal_templates`
--
ALTER TABLE `proposal_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposal_templates_currency_id_foreign` (`currency_id`),
  ADD KEY `proposal_templates_added_by_foreign` (`added_by`),
  ADD KEY `proposal_templates_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `proposal_template_items`
--
ALTER TABLE `proposal_template_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposal_template_items_proposal_template_id_foreign` (`proposal_template_id`);

--
-- Indexes for table `proposal_template_item_images`
--
ALTER TABLE `proposal_template_item_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proposal_template_item_images_proposal_template_item_id_foreign` (`proposal_template_item_id`);

--
-- Indexes for table `purpose_consent`
--
ALTER TABLE `purpose_consent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purpose_consent_leads`
--
ALTER TABLE `purpose_consent_leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purpose_consent_leads_lead_id_foreign` (`lead_id`),
  ADD KEY `purpose_consent_leads_purpose_consent_id_foreign` (`purpose_consent_id`),
  ADD KEY `purpose_consent_leads_updated_by_id_foreign` (`updated_by_id`);

--
-- Indexes for table `purpose_consent_users`
--
ALTER TABLE `purpose_consent_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purpose_consent_users_client_id_foreign` (`client_id`),
  ADD KEY `purpose_consent_users_purpose_consent_id_foreign` (`purpose_consent_id`),
  ADD KEY `purpose_consent_users_updated_by_id_foreign` (`updated_by_id`);

--
-- Indexes for table `pusher_settings`
--
ALTER TABLE `pusher_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `push_notification_settings`
--
ALTER TABLE `push_notification_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `push_subscriptions`
--
ALTER TABLE `push_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `push_subscriptions_endpoint_unique` (`endpoint`),
  ADD KEY `push_subscriptions_user_id_index` (`user_id`);

--
-- Indexes for table `p_m_assigns`
--
ALTER TABLE `p_m_assigns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `p_m_projects`
--
ALTER TABLE `p_m_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotations`
--
ALTER TABLE `quotations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotation_items`
--
ALTER TABLE `quotation_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quotation_items_quotation_id_foreign` (`quotation_id`);

--
-- Indexes for table `removal_requests`
--
ALTER TABLE `removal_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `removal_requests_user_id_foreign` (`user_id`);

--
-- Indexes for table `removal_requests_lead`
--
ALTER TABLE `removal_requests_lead`
  ADD PRIMARY KEY (`id`),
  ADD KEY `removal_requests_lead_lead_id_foreign` (`lead_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slack_settings`
--
ALTER TABLE `slack_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `smtp_settings`
--
ALTER TABLE `smtp_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `socials`
--
ALTER TABLE `socials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_auth_settings`
--
ALTER TABLE `social_auth_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sticky_notes`
--
ALTER TABLE `sticky_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sticky_notes_user_id_foreign` (`user_id`);

--
-- Indexes for table `sub_tasks`
--
ALTER TABLE `sub_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_tasks_task_id_foreign` (`task_id`),
  ADD KEY `sub_tasks_assigned_to_foreign` (`assigned_to`),
  ADD KEY `sub_tasks_added_by_foreign` (`added_by`),
  ADD KEY `sub_tasks_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `sub_task_files`
--
ALTER TABLE `sub_task_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_task_files_user_id_foreign` (`user_id`),
  ADD KEY `sub_task_files_sub_task_id_foreign` (`sub_task_id`);

--
-- Indexes for table `taskboard_columns`
--
ALTER TABLE `taskboard_columns`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taskboard_columns_column_name_unique` (`column_name`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_due_date_index` (`due_date`),
  ADD KEY `tasks_project_id_foreign` (`project_id`),
  ADD KEY `tasks_task_category_id_foreign` (`task_category_id`),
  ADD KEY `tasks_board_column_id_foreign` (`board_column_id`),
  ADD KEY `tasks_created_by_foreign` (`created_by`),
  ADD KEY `tasks_recurring_task_id_foreign` (`recurring_task_id`),
  ADD KEY `tasks_dependent_task_id_foreign` (`dependent_task_id`),
  ADD KEY `tasks_milestone_id_foreign` (`milestone_id`),
  ADD KEY `tasks_added_by_foreign` (`added_by`),
  ADD KEY `tasks_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `tasks_deleted_at_index` (`deleted_at`);

--
-- Indexes for table `task_category`
--
ALTER TABLE `task_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_category_added_by_foreign` (`added_by`),
  ADD KEY `task_category_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `task_comments`
--
ALTER TABLE `task_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_comments_user_id_foreign` (`user_id`),
  ADD KEY `task_comments_task_id_foreign` (`task_id`),
  ADD KEY `task_comments_added_by_foreign` (`added_by`),
  ADD KEY `task_comments_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `task_files`
--
ALTER TABLE `task_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_files_user_id_foreign` (`user_id`),
  ADD KEY `task_files_task_id_foreign` (`task_id`),
  ADD KEY `task_files_added_by_foreign` (`added_by`),
  ADD KEY `task_files_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `task_history`
--
ALTER TABLE `task_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_history_task_id_foreign` (`task_id`),
  ADD KEY `task_history_sub_task_id_foreign` (`sub_task_id`),
  ADD KEY `task_history_user_id_foreign` (`user_id`),
  ADD KEY `task_history_board_column_id_foreign` (`board_column_id`);

--
-- Indexes for table `task_labels`
--
ALTER TABLE `task_labels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_labels_label_id_foreign` (`label_id`),
  ADD KEY `task_tags_task_id_foreign` (`task_id`);

--
-- Indexes for table `task_label_list`
--
ALTER TABLE `task_label_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_label_list_project_id_foreign` (`project_id`);

--
-- Indexes for table `task_notes`
--
ALTER TABLE `task_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_notes_task_id_foreign` (`task_id`),
  ADD KEY `task_notes_added_by_foreign` (`added_by`),
  ADD KEY `task_notes_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `task_settings`
--
ALTER TABLE `task_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_users`
--
ALTER TABLE `task_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_users_task_id_foreign` (`task_id`),
  ADD KEY `task_users_user_id_foreign` (`user_id`);

--
-- Indexes for table `taxes`
--
ALTER TABLE `taxes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teams_added_by_foreign` (`added_by`),
  ADD KEY `teams_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `theme_settings`
--
ALTER TABLE `theme_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tickets_user_id_foreign` (`user_id`),
  ADD KEY `tickets_agent_id_foreign` (`agent_id`),
  ADD KEY `tickets_channel_id_foreign` (`channel_id`),
  ADD KEY `tickets_type_id_foreign` (`type_id`),
  ADD KEY `tickets_country_id_foreign` (`country_id`),
  ADD KEY `tickets_added_by_foreign` (`added_by`),
  ADD KEY `tickets_last_updated_by_foreign` (`last_updated_by`),
  ADD KEY `tickets_updated_at_index` (`updated_at`);

--
-- Indexes for table `ticket_agent_groups`
--
ALTER TABLE `ticket_agent_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_agent_groups_agent_id_foreign` (`agent_id`),
  ADD KEY `ticket_agent_groups_group_id_foreign` (`group_id`),
  ADD KEY `ticket_agent_groups_added_by_foreign` (`added_by`),
  ADD KEY `ticket_agent_groups_last_updated_by_foreign` (`last_updated_by`);

--
-- Indexes for table `ticket_channels`
--
ALTER TABLE `ticket_channels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_channels_channel_name_unique` (`channel_name`);

--
-- Indexes for table `ticket_custom_forms`
--
ALTER TABLE `ticket_custom_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_custom_forms_custom_fields_id_foreign` (`custom_fields_id`);

--
-- Indexes for table `ticket_email_settings`
--
ALTER TABLE `ticket_email_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_files`
--
ALTER TABLE `ticket_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_files_user_id_foreign` (`user_id`),
  ADD KEY `ticket_files_ticket_reply_id_foreign` (`ticket_reply_id`);

--
-- Indexes for table `ticket_groups`
--
ALTER TABLE `ticket_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_replies_ticket_id_foreign` (`ticket_id`),
  ADD KEY `ticket_replies_user_id_foreign` (`user_id`);

--
-- Indexes for table `ticket_reply_templates`
--
ALTER TABLE `ticket_reply_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_tags`
--
ALTER TABLE `ticket_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_tags_tag_id_foreign` (`tag_id`),
  ADD KEY `ticket_tags_ticket_id_foreign` (`ticket_id`);

--
-- Indexes for table `ticket_tag_list`
--
ALTER TABLE `ticket_tag_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_types`
--
ALTER TABLE `ticket_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_types_type_unique` (`type`);

--
-- Indexes for table `translate_settings`
--
ALTER TABLE `translate_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `universal_search`
--
ALTER TABLE `universal_search`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_country_id_foreign` (`country_id`);

--
-- Indexes for table `users_chat`
--
ALTER TABLE `users_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_chat_user_one_foreign` (`user_one`),
  ADD KEY `users_chat_user_id_foreign` (`user_id`),
  ADD KEY `users_chat_from_foreign` (`from`),
  ADD KEY `users_chat_to_foreign` (`to`);

--
-- Indexes for table `users_chat_files`
--
ALTER TABLE `users_chat_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_chat_files_user_id_foreign` (`user_id`),
  ADD KEY `users_chat_files_users_chat_id_foreign` (`users_chat_id`);

--
-- Indexes for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_activities_user_id_foreign` (`user_id`),
  ADD KEY `user_activities_created_at_index` (`created_at`);

--
-- Indexes for table `user_invitations`
--
ALTER TABLE `user_invitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_invitations_user_id_foreign` (`user_id`);

--
-- Indexes for table `user_leadboard_settings`
--
ALTER TABLE `user_leadboard_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_leadboard_settings_user_id_foreign` (`user_id`),
  ADD KEY `user_leadboard_settings_board_column_id_foreign` (`board_column_id`);

--
-- Indexes for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_permissions_user_id_foreign` (`user_id`),
  ADD KEY `user_permissions_permission_id_foreign` (`permission_id`),
  ADD KEY `user_permissions_permission_type_id_foreign` (`permission_type_id`);

--
-- Indexes for table `user_taskboard_settings`
--
ALTER TABLE `user_taskboard_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_taskboard_settings_user_id_foreign` (`user_id`),
  ADD KEY `user_taskboard_settings_board_column_id_foreign` (`board_column_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accept_estimates`
--
ALTER TABLE `accept_estimates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance_settings`
--
ALTER TABLE `attendance_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_categories`
--
ALTER TABLE `client_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_contacts`
--
ALTER TABLE `client_contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_details`
--
ALTER TABLE `client_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client_docs`
--
ALTER TABLE `client_docs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_notes`
--
ALTER TABLE `client_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client_sub_categories`
--
ALTER TABLE `client_sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_user_notes`
--
ALTER TABLE `client_user_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_addresses`
--
ALTER TABLE `company_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contract_custom_forms`
--
ALTER TABLE `contract_custom_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_discussions`
--
ALTER TABLE `contract_discussions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_files`
--
ALTER TABLE `contract_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_renews`
--
ALTER TABLE `contract_renews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_signs`
--
ALTER TABLE `contract_signs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_templates`
--
ALTER TABLE `contract_templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_types`
--
ALTER TABLE `contract_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conversation_reply`
--
ALTER TABLE `conversation_reply`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `credit_notes`
--
ALTER TABLE `credit_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credit_note_items`
--
ALTER TABLE `credit_note_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credit_note_item_images`
--
ALTER TABLE `credit_note_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `currency_format_settings`
--
ALTER TABLE `currency_format_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `custom_fields`
--
ALTER TABLE `custom_fields`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `custom_fields_data`
--
ALTER TABLE `custom_fields_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `custom_field_groups`
--
ALTER TABLE `custom_field_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `dashboard_widgets`
--
ALTER TABLE `dashboard_widgets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `database_backups`
--
ALTER TABLE `database_backups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `database_backup_cron_settings`
--
ALTER TABLE `database_backup_cron_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deals`
--
ALTER TABLE `deals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `discussions`
--
ALTER TABLE `discussions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discussion_categories`
--
ALTER TABLE `discussion_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `discussion_files`
--
ALTER TABLE `discussion_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discussion_replies`
--
ALTER TABLE `discussion_replies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_notification_settings`
--
ALTER TABLE `email_notification_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `emergency_contacts`
--
ALTER TABLE `emergency_contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_details`
--
ALTER TABLE `employee_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee_docs`
--
ALTER TABLE `employee_docs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_leave_quotas`
--
ALTER TABLE `employee_leave_quotas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `employee_shifts`
--
ALTER TABLE `employee_shifts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee_shift_change_requests`
--
ALTER TABLE `employee_shift_change_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_shift_schedules`
--
ALTER TABLE `employee_shift_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_skills`
--
ALTER TABLE `employee_skills`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee_teams`
--
ALTER TABLE `employee_teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estimates`
--
ALTER TABLE `estimates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estimate_items`
--
ALTER TABLE `estimate_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estimate_item_images`
--
ALTER TABLE `estimate_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_attendees`
--
ALTER TABLE `event_attendees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_files`
--
ALTER TABLE `event_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses_category`
--
ALTER TABLE `expenses_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses_category_roles`
--
ALTER TABLE `expenses_category_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses_recurring`
--
ALTER TABLE `expenses_recurring`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_storage`
--
ALTER TABLE `file_storage`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_storage_settings`
--
ALTER TABLE `file_storage_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `flags`
--
ALTER TABLE `flags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;

--
-- AUTO_INCREMENT for table `gdpr_settings`
--
ALTER TABLE `gdpr_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `google_calendar_modules`
--
ALTER TABLE `google_calendar_modules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_item_images`
--
ALTER TABLE `invoice_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_recurring`
--
ALTER TABLE `invoice_recurring`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_recurring_items`
--
ALTER TABLE `invoice_recurring_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_recurring_item_images`
--
ALTER TABLE `invoice_recurring_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_settings`
--
ALTER TABLE `invoice_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `knowledge_bases`
--
ALTER TABLE `knowledge_bases`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `knowledge_base_files`
--
ALTER TABLE `knowledge_base_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `knowledge_categories`
--
ALTER TABLE `knowledge_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `language_settings`
--
ALTER TABLE `language_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lead_agents`
--
ALTER TABLE `lead_agents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lead_category`
--
ALTER TABLE `lead_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lead_custom_forms`
--
ALTER TABLE `lead_custom_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `lead_files`
--
ALTER TABLE `lead_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lead_follow_up`
--
ALTER TABLE `lead_follow_up`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lead_notes`
--
ALTER TABLE `lead_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lead_sources`
--
ALTER TABLE `lead_sources`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `lead_status`
--
ALTER TABLE `lead_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lead_user_notes`
--
ALTER TABLE `lead_user_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaves`
--
ALTER TABLE `leaves`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave_types`
--
ALTER TABLE `leave_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `log_time_for`
--
ALTER TABLE `log_time_for`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ltm_translations`
--
ALTER TABLE `ltm_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_settings`
--
ALTER TABLE `menu_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message_settings`
--
ALTER TABLE `message_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=656;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `module_settings`
--
ALTER TABLE `module_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notice_views`
--
ALTER TABLE `notice_views`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offline_payment_methods`
--
ALTER TABLE `offline_payment_methods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item_images`
--
ALTER TABLE `order_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organisation_settings`
--
ALTER TABLE `organisation_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_gateway_credentials`
--
ALTER TABLE `payment_gateway_credentials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT for table `permission_types`
--
ALTER TABLE `permission_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pinned`
--
ALTER TABLE `pinned`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_files`
--
ALTER TABLE `product_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_sub_category`
--
ALTER TABLE `product_sub_category`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `project_activity`
--
ALTER TABLE `project_activity`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `project_category`
--
ALTER TABLE `project_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project_files`
--
ALTER TABLE `project_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_members`
--
ALTER TABLE `project_members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_milestones`
--
ALTER TABLE `project_milestones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_notes`
--
ALTER TABLE `project_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project_ratings`
--
ALTER TABLE `project_ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_settings`
--
ALTER TABLE `project_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project_status_settings`
--
ALTER TABLE `project_status_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `project_templates`
--
ALTER TABLE `project_templates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_template_members`
--
ALTER TABLE `project_template_members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_template_sub_tasks`
--
ALTER TABLE `project_template_sub_tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_template_tasks`
--
ALTER TABLE `project_template_tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_template_task_users`
--
ALTER TABLE `project_template_task_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_time_logs`
--
ALTER TABLE `project_time_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_time_log_breaks`
--
ALTER TABLE `project_time_log_breaks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_user_notes`
--
ALTER TABLE `project_user_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposals`
--
ALTER TABLE `proposals`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_items`
--
ALTER TABLE `proposal_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_item_images`
--
ALTER TABLE `proposal_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_signs`
--
ALTER TABLE `proposal_signs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_templates`
--
ALTER TABLE `proposal_templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_template_items`
--
ALTER TABLE `proposal_template_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_template_item_images`
--
ALTER TABLE `proposal_template_item_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purpose_consent`
--
ALTER TABLE `purpose_consent`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purpose_consent_leads`
--
ALTER TABLE `purpose_consent_leads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purpose_consent_users`
--
ALTER TABLE `purpose_consent_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pusher_settings`
--
ALTER TABLE `pusher_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `push_notification_settings`
--
ALTER TABLE `push_notification_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `push_subscriptions`
--
ALTER TABLE `push_subscriptions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `p_m_assigns`
--
ALTER TABLE `p_m_assigns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `p_m_projects`
--
ALTER TABLE `p_m_projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quotation_items`
--
ALTER TABLE `quotation_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `removal_requests`
--
ALTER TABLE `removal_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `removal_requests_lead`
--
ALTER TABLE `removal_requests_lead`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slack_settings`
--
ALTER TABLE `slack_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `smtp_settings`
--
ALTER TABLE `smtp_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `socials`
--
ALTER TABLE `socials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_auth_settings`
--
ALTER TABLE `social_auth_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sticky_notes`
--
ALTER TABLE `sticky_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_tasks`
--
ALTER TABLE `sub_tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_task_files`
--
ALTER TABLE `sub_task_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taskboard_columns`
--
ALTER TABLE `taskboard_columns`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_category`
--
ALTER TABLE `task_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_comments`
--
ALTER TABLE `task_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_files`
--
ALTER TABLE `task_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_history`
--
ALTER TABLE `task_history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_labels`
--
ALTER TABLE `task_labels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_label_list`
--
ALTER TABLE `task_label_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_notes`
--
ALTER TABLE `task_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_settings`
--
ALTER TABLE `task_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task_users`
--
ALTER TABLE `task_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taxes`
--
ALTER TABLE `taxes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `theme_settings`
--
ALTER TABLE `theme_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_agent_groups`
--
ALTER TABLE `ticket_agent_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_channels`
--
ALTER TABLE `ticket_channels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `ticket_custom_forms`
--
ALTER TABLE `ticket_custom_forms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ticket_email_settings`
--
ALTER TABLE `ticket_email_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ticket_files`
--
ALTER TABLE `ticket_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_groups`
--
ALTER TABLE `ticket_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_reply_templates`
--
ALTER TABLE `ticket_reply_templates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_tags`
--
ALTER TABLE `ticket_tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_tag_list`
--
ALTER TABLE `ticket_tag_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_types`
--
ALTER TABLE `ticket_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `translate_settings`
--
ALTER TABLE `translate_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `universal_search`
--
ALTER TABLE `universal_search`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users_chat`
--
ALTER TABLE `users_chat`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_chat_files`
--
ALTER TABLE `users_chat_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_activities`
--
ALTER TABLE `user_activities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_invitations`
--
ALTER TABLE `user_invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_leadboard_settings`
--
ALTER TABLE `user_leadboard_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_permissions`
--
ALTER TABLE `user_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2404;

--
-- AUTO_INCREMENT for table `user_taskboard_settings`
--
ALTER TABLE `user_taskboard_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accept_estimates`
--
ALTER TABLE `accept_estimates`
  ADD CONSTRAINT `accept_estimates_estimate_id_foreign` FOREIGN KEY (`estimate_id`) REFERENCES `estimates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `attendances_employee_shift_id_foreign` FOREIGN KEY (`employee_shift_id`) REFERENCES `employee_shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `attendances_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `attendances_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `company_addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendance_settings`
--
ALTER TABLE `attendance_settings`
  ADD CONSTRAINT `attendance_settings_default_employee_shift_foreign` FOREIGN KEY (`default_employee_shift`) REFERENCES `employee_shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `client_contacts`
--
ALTER TABLE `client_contacts`
  ADD CONSTRAINT `client_contacts_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_contacts_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_details`
--
ALTER TABLE `client_details`
  ADD CONSTRAINT `client_details_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_details_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `client_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_details_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_details_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `client_sub_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_docs`
--
ALTER TABLE `client_docs`
  ADD CONSTRAINT `client_docs_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_docs_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_docs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_notes`
--
ALTER TABLE `client_notes`
  ADD CONSTRAINT `client_notes_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_notes_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `client_notes_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `client_notes_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_sub_categories`
--
ALTER TABLE `client_sub_categories`
  ADD CONSTRAINT `client_sub_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `client_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client_user_notes`
--
ALTER TABLE `client_user_notes`
  ADD CONSTRAINT `client_user_notes_client_note_id_foreign` FOREIGN KEY (`client_note_id`) REFERENCES `client_notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `client_user_notes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `contracts_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contracts_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contracts_contract_type_id_foreign` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contracts_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contracts_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contract_custom_forms`
--
ALTER TABLE `contract_custom_forms`
  ADD CONSTRAINT `contract_custom_forms_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_custom_forms_custom_fields_id_foreign` FOREIGN KEY (`custom_fields_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_custom_forms_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contract_discussions`
--
ALTER TABLE `contract_discussions`
  ADD CONSTRAINT `contract_discussions_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_discussions_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_discussions_from_foreign` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_discussions_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contract_files`
--
ALTER TABLE `contract_files`
  ADD CONSTRAINT `contract_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_files_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contract_renews`
--
ALTER TABLE `contract_renews`
  ADD CONSTRAINT `contract_renews_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_renews_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_renews_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_renews_renewed_by_foreign` FOREIGN KEY (`renewed_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contract_signs`
--
ALTER TABLE `contract_signs`
  ADD CONSTRAINT `contract_signs_contract_id_foreign` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contract_templates`
--
ALTER TABLE `contract_templates`
  ADD CONSTRAINT `contract_templates_contract_type_id_foreign` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contract_templates_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `conversation_user_one_foreign` FOREIGN KEY (`user_one`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `conversation_user_two_foreign` FOREIGN KEY (`user_two`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `conversation_reply`
--
ALTER TABLE `conversation_reply`
  ADD CONSTRAINT `conversation_reply_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `conversation_reply_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `credit_notes`
--
ALTER TABLE `credit_notes`
  ADD CONSTRAINT `credit_notes_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `credit_notes_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `credit_notes_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `credit_notes_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `credit_notes_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `credit_note_items`
--
ALTER TABLE `credit_note_items`
  ADD CONSTRAINT `credit_note_items_credit_note_id_foreign` FOREIGN KEY (`credit_note_id`) REFERENCES `credit_notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `credit_note_item_images`
--
ALTER TABLE `credit_note_item_images`
  ADD CONSTRAINT `credit_note_item_images_credit_note_item_id_foreign` FOREIGN KEY (`credit_note_item_id`) REFERENCES `credit_note_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `custom_fields`
--
ALTER TABLE `custom_fields`
  ADD CONSTRAINT `custom_fields_custom_field_group_id_foreign` FOREIGN KEY (`custom_field_group_id`) REFERENCES `custom_field_groups` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `custom_fields_data`
--
ALTER TABLE `custom_fields_data`
  ADD CONSTRAINT `custom_fields_data_custom_field_id_foreign` FOREIGN KEY (`custom_field_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `designations`
--
ALTER TABLE `designations`
  ADD CONSTRAINT `designations_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `designations_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `discussions`
--
ALTER TABLE `discussions`
  ADD CONSTRAINT `discussions_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `discussions_best_answer_id_foreign` FOREIGN KEY (`best_answer_id`) REFERENCES `discussion_replies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `discussions_discussion_category_id_foreign` FOREIGN KEY (`discussion_category_id`) REFERENCES `discussion_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `discussions_last_reply_by_id_foreign` FOREIGN KEY (`last_reply_by_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `discussions_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `discussions_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `discussions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `discussion_files`
--
ALTER TABLE `discussion_files`
  ADD CONSTRAINT `discussion_files_discussion_id_foreign` FOREIGN KEY (`discussion_id`) REFERENCES `discussions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `discussion_files_discussion_reply_id_foreign` FOREIGN KEY (`discussion_reply_id`) REFERENCES `discussion_replies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `discussion_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `discussion_replies`
--
ALTER TABLE `discussion_replies`
  ADD CONSTRAINT `discussion_replies_discussion_id_foreign` FOREIGN KEY (`discussion_id`) REFERENCES `discussions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `discussion_replies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `emergency_contacts`
--
ALTER TABLE `emergency_contacts`
  ADD CONSTRAINT `emergency_contacts_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `emergency_contacts_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `emergency_contacts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_details`
--
ALTER TABLE `employee_details`
  ADD CONSTRAINT `employee_details_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_details_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_details_designation_id_foreign` FOREIGN KEY (`designation_id`) REFERENCES `designations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_details_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_details_reporting_to_foreign` FOREIGN KEY (`reporting_to`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_docs`
--
ALTER TABLE `employee_docs`
  ADD CONSTRAINT `employee_docs_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_docs_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_docs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_leave_quotas`
--
ALTER TABLE `employee_leave_quotas`
  ADD CONSTRAINT `employee_leave_quotas_leave_type_id_foreign` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_leave_quotas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_shift_change_requests`
--
ALTER TABLE `employee_shift_change_requests`
  ADD CONSTRAINT `employee_shift_change_requests_employee_shift_id_foreign` FOREIGN KEY (`employee_shift_id`) REFERENCES `employee_shifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_shift_change_requests_shift_schedule_id_foreign` FOREIGN KEY (`shift_schedule_id`) REFERENCES `employee_shift_schedules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_shift_schedules`
--
ALTER TABLE `employee_shift_schedules`
  ADD CONSTRAINT `employee_shift_schedules_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_shift_schedules_employee_shift_id_foreign` FOREIGN KEY (`employee_shift_id`) REFERENCES `employee_shifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_shift_schedules_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_shift_schedules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_skills`
--
ALTER TABLE `employee_skills`
  ADD CONSTRAINT `employee_skills_skill_id_foreign` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_skills_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_teams`
--
ALTER TABLE `employee_teams`
  ADD CONSTRAINT `employee_teams_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_teams_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `estimates`
--
ALTER TABLE `estimates`
  ADD CONSTRAINT `estimates_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `estimates_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estimates_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estimates_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `estimate_items`
--
ALTER TABLE `estimate_items`
  ADD CONSTRAINT `estimate_items_estimate_id_foreign` FOREIGN KEY (`estimate_id`) REFERENCES `estimates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `estimate_item_images`
--
ALTER TABLE `estimate_item_images`
  ADD CONSTRAINT `estimate_item_images_estimate_item_id_foreign` FOREIGN KEY (`estimate_item_id`) REFERENCES `estimate_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `events_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `event_attendees`
--
ALTER TABLE `event_attendees`
  ADD CONSTRAINT `event_attendees_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_attendees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event_files`
--
ALTER TABLE `event_files`
  ADD CONSTRAINT `event_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `event_files_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_approver_id_foreign` FOREIGN KEY (`approver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `expenses_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_expenses_recurring_id_foreign` FOREIGN KEY (`expenses_recurring_id`) REFERENCES `expenses_recurring` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `expenses_category`
--
ALTER TABLE `expenses_category`
  ADD CONSTRAINT `expenses_category_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_category_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `expenses_category_roles`
--
ALTER TABLE `expenses_category_roles`
  ADD CONSTRAINT `expenses_category_roles_expenses_category_id_foreign` FOREIGN KEY (`expenses_category_id`) REFERENCES `expenses_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_category_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `expenses_recurring`
--
ALTER TABLE `expenses_recurring`
  ADD CONSTRAINT `expenses_recurring_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_recurring_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `expenses_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_recurring_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_recurring_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_recurring_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_recurring_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_recurring_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `holidays`
--
ALTER TABLE `holidays`
  ADD CONSTRAINT `holidays_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `holidays_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_company_address_id_foreign` FOREIGN KEY (`company_address_id`) REFERENCES `company_addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_estimate_id_foreign` FOREIGN KEY (`estimate_id`) REFERENCES `estimates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_invoice_recurring_id_foreign` FOREIGN KEY (`invoice_recurring_id`) REFERENCES `invoice_recurring` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `invoices_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_item_images`
--
ALTER TABLE `invoice_item_images`
  ADD CONSTRAINT `invoice_item_images_invoice_item_id_foreign` FOREIGN KEY (`invoice_item_id`) REFERENCES `invoice_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_recurring`
--
ALTER TABLE `invoice_recurring`
  ADD CONSTRAINT `invoice_recurring_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_recurring_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_recurring_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_recurring_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_recurring_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_recurring_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_recurring_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `invoice_recurring_items`
--
ALTER TABLE `invoice_recurring_items`
  ADD CONSTRAINT `invoice_recurring_items_invoice_recurring_id_foreign` FOREIGN KEY (`invoice_recurring_id`) REFERENCES `invoice_recurring` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_recurring_item_images`
--
ALTER TABLE `invoice_recurring_item_images`
  ADD CONSTRAINT `invoice_recurring_item_images_invoice_recurring_item_id_foreign` FOREIGN KEY (`invoice_recurring_item_id`) REFERENCES `invoice_recurring_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issues_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `knowledge_bases`
--
ALTER TABLE `knowledge_bases`
  ADD CONSTRAINT `knowledge_bases_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `knowledge_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `knowledge_base_files`
--
ALTER TABLE `knowledge_base_files`
  ADD CONSTRAINT `knowledge_base_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `knowledge_base_files_knowledge_base_id_foreign` FOREIGN KEY (`knowledge_base_id`) REFERENCES `knowledge_bases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `knowledge_base_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_agent_id_foreign` FOREIGN KEY (`agent_id`) REFERENCES `lead_agents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `lead_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lead_agents`
--
ALTER TABLE `lead_agents`
  ADD CONSTRAINT `lead_agents_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_agents_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_agents_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lead_category`
--
ALTER TABLE `lead_category`
  ADD CONSTRAINT `lead_category_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_category_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lead_custom_forms`
--
ALTER TABLE `lead_custom_forms`
  ADD CONSTRAINT `lead_custom_forms_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_custom_forms_custom_fields_id_foreign` FOREIGN KEY (`custom_fields_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_custom_forms_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lead_files`
--
ALTER TABLE `lead_files`
  ADD CONSTRAINT `lead_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_files_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lead_follow_up`
--
ALTER TABLE `lead_follow_up`
  ADD CONSTRAINT `lead_follow_up_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_follow_up_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_follow_up_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lead_notes`
--
ALTER TABLE `lead_notes`
  ADD CONSTRAINT `lead_notes_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_notes_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_notes_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_notes_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lead_sources`
--
ALTER TABLE `lead_sources`
  ADD CONSTRAINT `lead_sources_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_sources_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lead_user_notes`
--
ALTER TABLE `lead_user_notes`
  ADD CONSTRAINT `lead_user_notes_lead_note_id_foreign` FOREIGN KEY (`lead_note_id`) REFERENCES `lead_notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lead_user_notes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `leaves`
--
ALTER TABLE `leaves`
  ADD CONSTRAINT `leaves_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaves_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaves_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leaves_leave_type_id_foreign` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `leaves_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notices`
--
ALTER TABLE `notices`
  ADD CONSTRAINT `notices_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notices_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notices_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notice_views`
--
ALTER TABLE `notice_views`
  ADD CONSTRAINT `notice_views_notice_id_foreign` FOREIGN KEY (`notice_id`) REFERENCES `notices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notice_views_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_company_address_id_foreign` FOREIGN KEY (`company_address_id`) REFERENCES `company_addresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_item_images`
--
ALTER TABLE `order_item_images`
  ADD CONSTRAINT `order_item_images_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organisation_settings`
--
ALTER TABLE `organisation_settings`
  ADD CONSTRAINT `organisation_settings_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `organisation_settings_default_task_status_foreign` FOREIGN KEY (`default_task_status`) REFERENCES `taskboard_columns` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `organisation_settings_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_credit_notes_id_foreign` FOREIGN KEY (`credit_notes_id`) REFERENCES `credit_notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_offline_method_id_foreign` FOREIGN KEY (`offline_method_id`) REFERENCES `offline_payment_methods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_permission_type_id_foreign` FOREIGN KEY (`permission_type_id`) REFERENCES `permission_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pinned`
--
ALTER TABLE `pinned`
  ADD CONSTRAINT `pinned_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pinned_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pinned_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `product_sub_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_files`
--
ALTER TABLE `product_files`
  ADD CONSTRAINT `product_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_files_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_sub_category`
--
ALTER TABLE `product_sub_category`
  ADD CONSTRAINT `product_sub_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_project_admin_foreign` FOREIGN KEY (`project_admin`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `project_activity`
--
ALTER TABLE `project_activity`
  ADD CONSTRAINT `project_activity_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_category`
--
ALTER TABLE `project_category`
  ADD CONSTRAINT `project_category_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_category_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `project_files`
--
ALTER TABLE `project_files`
  ADD CONSTRAINT `project_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_files_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `project_members_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_members_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_members_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_milestones`
--
ALTER TABLE `project_milestones`
  ADD CONSTRAINT `project_milestones_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_milestones_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_milestones_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_milestones_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_notes`
--
ALTER TABLE `project_notes`
  ADD CONSTRAINT `project_notes_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_notes_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_notes_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_notes_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_ratings`
--
ALTER TABLE `project_ratings`
  ADD CONSTRAINT `project_ratings_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_ratings_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_ratings_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_templates`
--
ALTER TABLE `project_templates`
  ADD CONSTRAINT `project_templates_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_templates_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `project_template_members`
--
ALTER TABLE `project_template_members`
  ADD CONSTRAINT `project_template_members_project_template_id_foreign` FOREIGN KEY (`project_template_id`) REFERENCES `project_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_template_members_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_template_sub_tasks`
--
ALTER TABLE `project_template_sub_tasks`
  ADD CONSTRAINT `project_template_sub_tasks_project_template_task_id_foreign` FOREIGN KEY (`project_template_task_id`) REFERENCES `project_template_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_template_tasks`
--
ALTER TABLE `project_template_tasks`
  ADD CONSTRAINT `project_template_tasks_project_template_id_foreign` FOREIGN KEY (`project_template_id`) REFERENCES `project_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_template_tasks_project_template_task_category_id_foreign` FOREIGN KEY (`project_template_task_category_id`) REFERENCES `task_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `project_template_task_users`
--
ALTER TABLE `project_template_task_users`
  ADD CONSTRAINT `project_template_task_users_project_template_task_id_foreign` FOREIGN KEY (`project_template_task_id`) REFERENCES `project_template_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_template_task_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_time_logs`
--
ALTER TABLE `project_time_logs`
  ADD CONSTRAINT `project_time_logs_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_edited_by_user_foreign` FOREIGN KEY (`edited_by_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_time_log_breaks`
--
ALTER TABLE `project_time_log_breaks`
  ADD CONSTRAINT `project_time_log_breaks_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_log_breaks_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_time_log_breaks_project_time_log_id_foreign` FOREIGN KEY (`project_time_log_id`) REFERENCES `project_time_logs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_user_notes`
--
ALTER TABLE `project_user_notes`
  ADD CONSTRAINT `project_user_notes_project_note_id_foreign` FOREIGN KEY (`project_note_id`) REFERENCES `project_notes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_user_notes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proposals`
--
ALTER TABLE `proposals`
  ADD CONSTRAINT `proposals_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `proposals_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proposals_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `proposals_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proposal_items`
--
ALTER TABLE `proposal_items`
  ADD CONSTRAINT `proposal_items_proposal_id_foreign` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proposal_item_images`
--
ALTER TABLE `proposal_item_images`
  ADD CONSTRAINT `proposal_item_images_proposal_item_id_foreign` FOREIGN KEY (`proposal_item_id`) REFERENCES `proposal_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proposal_signs`
--
ALTER TABLE `proposal_signs`
  ADD CONSTRAINT `proposal_signs_proposal_id_foreign` FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proposal_templates`
--
ALTER TABLE `proposal_templates`
  ADD CONSTRAINT `proposal_templates_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `proposal_templates_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proposal_templates_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `proposal_template_items`
--
ALTER TABLE `proposal_template_items`
  ADD CONSTRAINT `proposal_template_items_proposal_template_id_foreign` FOREIGN KEY (`proposal_template_id`) REFERENCES `proposal_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proposal_template_item_images`
--
ALTER TABLE `proposal_template_item_images`
  ADD CONSTRAINT `proposal_template_item_images_proposal_template_item_id_foreign` FOREIGN KEY (`proposal_template_item_id`) REFERENCES `proposal_template_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purpose_consent_leads`
--
ALTER TABLE `purpose_consent_leads`
  ADD CONSTRAINT `purpose_consent_leads_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purpose_consent_leads_purpose_consent_id_foreign` FOREIGN KEY (`purpose_consent_id`) REFERENCES `purpose_consent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purpose_consent_leads_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purpose_consent_users`
--
ALTER TABLE `purpose_consent_users`
  ADD CONSTRAINT `purpose_consent_users_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purpose_consent_users_purpose_consent_id_foreign` FOREIGN KEY (`purpose_consent_id`) REFERENCES `purpose_consent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purpose_consent_users_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `push_subscriptions`
--
ALTER TABLE `push_subscriptions`
  ADD CONSTRAINT `push_subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quotation_items`
--
ALTER TABLE `quotation_items`
  ADD CONSTRAINT `quotation_items_quotation_id_foreign` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `removal_requests`
--
ALTER TABLE `removal_requests`
  ADD CONSTRAINT `removal_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `removal_requests_lead`
--
ALTER TABLE `removal_requests_lead`
  ADD CONSTRAINT `removal_requests_lead_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sticky_notes`
--
ALTER TABLE `sticky_notes`
  ADD CONSTRAINT `sticky_notes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_tasks`
--
ALTER TABLE `sub_tasks`
  ADD CONSTRAINT `sub_tasks_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sub_tasks_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sub_tasks_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sub_tasks_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_task_files`
--
ALTER TABLE `sub_task_files`
  ADD CONSTRAINT `sub_task_files_sub_task_id_foreign` FOREIGN KEY (`sub_task_id`) REFERENCES `sub_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sub_task_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_board_column_id_foreign` FOREIGN KEY (`board_column_id`) REFERENCES `taskboard_columns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_dependent_task_id_foreign` FOREIGN KEY (`dependent_task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_milestone_id_foreign` FOREIGN KEY (`milestone_id`) REFERENCES `project_milestones` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_recurring_task_id_foreign` FOREIGN KEY (`recurring_task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_task_category_id_foreign` FOREIGN KEY (`task_category_id`) REFERENCES `task_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `task_category`
--
ALTER TABLE `task_category`
  ADD CONSTRAINT `task_category_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_category_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `task_comments`
--
ALTER TABLE `task_comments`
  ADD CONSTRAINT `task_comments_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_comments_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_comments_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_files`
--
ALTER TABLE `task_files`
  ADD CONSTRAINT `task_files_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_files_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_files_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_history`
--
ALTER TABLE `task_history`
  ADD CONSTRAINT `task_history_board_column_id_foreign` FOREIGN KEY (`board_column_id`) REFERENCES `taskboard_columns` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_history_sub_task_id_foreign` FOREIGN KEY (`sub_task_id`) REFERENCES `sub_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_history_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_history_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_labels`
--
ALTER TABLE `task_labels`
  ADD CONSTRAINT `task_labels_label_id_foreign` FOREIGN KEY (`label_id`) REFERENCES `task_label_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_tags_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_label_list`
--
ALTER TABLE `task_label_list`
  ADD CONSTRAINT `task_label_list_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_notes`
--
ALTER TABLE `task_notes`
  ADD CONSTRAINT `task_notes_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_notes_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `task_notes_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_users`
--
ALTER TABLE `task_users`
  ADD CONSTRAINT `task_users_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teams_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_agent_id_foreign` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_channel_id_foreign` FOREIGN KEY (`channel_id`) REFERENCES `ticket_channels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `ticket_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket_agent_groups`
--
ALTER TABLE `ticket_agent_groups`
  ADD CONSTRAINT `ticket_agent_groups_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_agent_groups_agent_id_foreign` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_agent_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `ticket_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_agent_groups_last_updated_by_foreign` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ticket_custom_forms`
--
ALTER TABLE `ticket_custom_forms`
  ADD CONSTRAINT `ticket_custom_forms_custom_fields_id_foreign` FOREIGN KEY (`custom_fields_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket_files`
--
ALTER TABLE `ticket_files`
  ADD CONSTRAINT `ticket_files_ticket_reply_id_foreign` FOREIGN KEY (`ticket_reply_id`) REFERENCES `ticket_replies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD CONSTRAINT `ticket_replies_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_replies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket_tags`
--
ALTER TABLE `ticket_tags`
  ADD CONSTRAINT `ticket_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `ticket_tag_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_tags_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users_chat`
--
ALTER TABLE `users_chat`
  ADD CONSTRAINT `users_chat_from_foreign` FOREIGN KEY (`from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_chat_to_foreign` FOREIGN KEY (`to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_chat_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_chat_user_one_foreign` FOREIGN KEY (`user_one`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_chat_files`
--
ALTER TABLE `users_chat_files`
  ADD CONSTRAINT `users_chat_files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_chat_files_users_chat_id_foreign` FOREIGN KEY (`users_chat_id`) REFERENCES `users_chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD CONSTRAINT `user_activities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_invitations`
--
ALTER TABLE `user_invitations`
  ADD CONSTRAINT `user_invitations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_leadboard_settings`
--
ALTER TABLE `user_leadboard_settings`
  ADD CONSTRAINT `user_leadboard_settings_board_column_id_foreign` FOREIGN KEY (`board_column_id`) REFERENCES `lead_status` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `user_leadboard_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD CONSTRAINT `user_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_permissions_permission_type_id_foreign` FOREIGN KEY (`permission_type_id`) REFERENCES `permission_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_permissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_taskboard_settings`
--
ALTER TABLE `user_taskboard_settings`
  ADD CONSTRAINT `user_taskboard_settings_board_column_id_foreign` FOREIGN KEY (`board_column_id`) REFERENCES `taskboard_columns` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `user_taskboard_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
