

export const projectTaskTableDefaultVisibleColumns = (auth, type) => ({
    task: true,
    timer_status: true,
    milestone: auth.getRoleId() !== 5,
    deliverable: true,
    project: true,
    client: true,
    project_manager: true,
    creation_date: true,
    due_date: true,
    start_date: true,
    completion_date: auth.getRoleId() !== 5,
    approved_on: true,
    estimated_time: true,
    hours_logged: true,
    assigned_by: true,
    assigned_to: auth.getRoleId() !== 5,
    status: true,
    progress: auth.getRoleId() !== 5,
    report: true,
});






export const ProjectData = [
    {
        projectType: "Hourly",
        projectData: {
            client: {
                name: "Jill De",
                country: {
                    iso: "au",
                    nicename: "Australia",
                    country_id: 13,
                },
                image_url: "ghdfdhf",
                client_id: 251,
            },
            pm: {
                name: "Belayat Hossain",
                country: {
                    iso: "bd",
                    nicename: "Bangladesh",
                    country_id: 19,
                },
                image_url: "dghgfhg",
                pm_id: 1,
            },
            project: {
                start_date: "2021-09-01",
                deadline: "2021-09-30",
                project_id: 1,
                progress: 50,
                project_budget: 1000,
                upsell_actual_amount: 200,
                currency: "USD",
                currency_symbol: "$",
                deal: {
                    deal_id: 1,
                    original_currency: {
                        currency_code: "AUD",
                        amount: 650,
                    },
                    profile_link: "https://www.freelancer.com/u/mbjsolutions?from=messaging&ref_project_id=38007534",
                    message_link: [
                        "https://www.freelancer.com/messages/thread/326491443?filter=active",
                    ],
                    description2: `<p>E-commerce website on wordpress</p>`,
                    description3: `<p>1. The site will be on Wordpress</p>

                    <p>2. The site will have standard e-commerce functionalities</p>
                    
                    <p>3. The currency will be GBP</p>
                    
                    <p>4. pages -&nbsp;Home, categories, products, contact, blog, add to cart, checkout, user account</p>
                    
                    <p>5. There will be 12 products in total that will be uploaded by us.</p>
                    
                    <p>6.&nbsp;The design will be custom modern design similar to <a href="https://www.freelancer.com/users/l.php?url=https:%2F%2Fwww.kolkol.co.za%2Fhottubs.php&amp;sig=b23b9c4a06c889e25185e8de2c797744ec1c23d38f973deb396635d88f4d2fe9" target="_blank">https://www.kolkol.co.za/hottubs.php</a></p>
                    
                    <p>7.&nbsp;Images and all information will be used from the reference site as well, the client will share 'about us' content, and the rest will be collected from the reference site.</p>
                    
                    <p>8. We&nbsp;will integrate a payment gateway of the client's&nbsp;choice.</p>
                    
                    <p>9. We need to transform the client's logo from JPEG to PSD or Ai</p>
                    
                    <p>&nbsp;</p>
                    
                    <p>&nbsp;</p>`,
                    description4: `<p><a href="https://www.freelancer.com/users/l.php?url=https:%2F%2Fwww.kolkol.co.za%2Fhottubs.php&amp;sig=b23b9c4a06c889e25185e8de2c797744ec1c23d38f973deb396635d88f4d2fe9" target="_blank">https://www.kolkol.co.za/hottubs.php</a></p>`,
                    description5: `<p>Please complete the project before mid-next week.&nbsp;</p>`,
                    description6: `<ol><li>Godaddy:</li><li>User:&nbsp;john@cartagenafishing.com</li><li>Pass:&nbsp;Isla24680!!!</li></ol><div>WordPress:</div><div>URL:&nbsp;https://cartagenafishing.com/wp-admin</div><div>User:&nbsp;john@cartagenafishing.com</div><div>Pass:&nbsp;I2n%w4yQZdG0K0IPt4UEVeGm</div>`,
                    description7: `<p>You can take from the existing site, but I asked the raw logo file. If he can't provide the raw file, we will sell our logo service, also the logo doesn't look good, we will try to sell this logo service after the project is accepted. Please let me know once you accept the project.&nbsp;</p>`,
                    description8: `<p>We should be able to get seo and google ad work from him if this project goes well, he should be a well paying client&nbsp;&nbsp;</p>`,
                    description9: `<p>Asked for partial release as you show progress of the work.</p>`,

                },
                project_summary: `<p><strong>We need to fix the product main Image to high resulation dynamically.</strong><br>
                <strong>Website:</strong>&nbsp;https://homedesignstoreflorida.com/</p>
                
                <p><br>
                <strong>Task Details:&nbsp;</strong></p>
                
                <ul>
                    <li>Every single product page, The main product image is looks blury even on uploading high resulation images:&nbsp;https://prnt.sc/bceeih0I4kuV&nbsp;</li>
                    <li>We need implement on global solution, So that every product images will look on perfect resulation.&nbsp;</li>
                    <li>As it is Global solution, It should be applied for all products and upcoming products.&nbsp;</li>
                </ul>
                
                <p><strong>Solution:&nbsp;</strong></p>
                
                <ul>
                    <li>Main loading pic is cropped by 450*320. We need to change this to 1024px width in template code:&nbsp;https://prnt.sc/5quIKtB74suH&nbsp;</li>
                    <li>It is just a quick fix. Submit it to me on Monday.</li>
                </ul>
                
                <p><strong>Website access:&nbsp;<br>
                Domain</strong> - https://homedesignstoreflorida.com/<br>
                Platform- Shopify<br>
                homedsignstore@gmail.com<br>
                Password - Shopify123//</p>`,
                project_challenges: "Nothing to mention here",
                comment: "Nothing to mention here",
                requirement_defined: "Ok but milestone breakdown was wrong and it is confusing. Sale team can change the milestone breakdown while making the milestione.. Otherwise it can be a issue if the client will go for any intentional issue.",
                deadline_meet: "yes, but need to be careful because of Eid vacation.",
            },
            working_environment: {
                site_url: "https://homedesignstoreflorida.com/",
                frontend_password: "Shopify123//",
                login_url: "https://homedesignstoreflorida.com/admin",
                email: "seopageone@gamil.com",
                password: "Isla24680!!!",
            },
            pm_task_guideline: {
                theme_details: 1,
                theme_name: "Broadcast",
                theme_url: "https://woodmart.xtemos.com/",
                design_details: 1,
                design: "The Reference Site That Has to Be Clone",
                xd_url: "https://xd.adobe.com/view/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b/",
                drive_url: "https://drive.google.com/drive/folders/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b",
                reference_link: ["https:www.nietiet.gmbh", "https:kapsafill.de"],
                instruction: `<p>This is not a reference for cloning or doing the design same, we just take inspiration from the color and the way the wordings are.&nbsp;</p>`,
                primary_color: "#610D14",
                primary_color_description: `<p>Theme-based color. use color from the theme demo</p>`,
                color_schema: 1,
                color: ["#222222", "#FFFFFF", "#C09631"],
                color_description: ["<p>Body text color<p>", "<p>Dark background text color<p>", "<p>Dark background title color. Same as demo<p>"],
                plugin_research: 1,
                plugin_name: "TranslatePress",
                plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                google_drive_link: "https://drive.google.com/drive/folders/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b",
                instruction_plugin: `<p>You can use this plugin for migrating the website</p>`
            },
            task_guideline_authorization: [
                {
                    id: 1,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Theme Details",
                    status: null,
                },
                {
                    id: 2,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Design Details",
                    status: null,

                },
                {
                    id: 3,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Color Schema",
                    status: null,
                },
                {
                    id: 4,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Plugin Research",
                    status: null,
                }
            ],
            project_submission: {
                actual_link: "https://homedesignstoreflorida.com/",
                dummy_link: "https://homedesignstoreflorida.com/",
                qc_protocol: 1,
                login_yes: 1,
                login_information: 1,
                login_url: "https://homedesignstoreflorida.com/admin",
                login: 'ian_truckyeah@test.com',
                password: "Isla24680!!!",
                screenshot: "https://prnt.sc/3FwufLmLIirf",
                drive_yes: 1,
                drive_information: 1,
                google_link: "https://drive.google.com/drive/folders/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b",
                rating: 5,
                comments: `I had to fix many things like the slider button icon, Button style, and Bioimage. 
                It took much time compared to the task difficulties.`,
                requirements: 10,
                comments2: `ok`,
                price: 8,
                comments3: `ok`,
                niche: "E-commerce",
                category_name: "E-commerce",
                dummy_information: 1,
                notify: 1,
                actual_yes: 1,
                admin_comment: null,
                // admin_comment: `<p>Yes, This website functions are very complex... There are lots of data that is much problems and not properly sequenced&nbsp;</p>`,
            },
            project_portfolio: {
                cms_name: "WordPress",
                website_type: "E-commerce",
                category_name: "E-commerce",
                main_page_number: 5,
                main_page_name: "Home Page",
                secondary_page_number: 5,
                secondary_page_name: "About Page",
                backup_email_address: 'admin@gmail.com',
                day_interval: "Every 7 days",
                description: `<p>Yes, This website functions are very complex... There are lots of data that is much problems and not properly sequenced&nbsp;</p>`,
                theme_id: 1,
                website_theme: {
                    theme_name: "Broadcast",
                    theme_url: "https://woodmart.xtemos.com/",
                },
                theme_name: null,
                theme_url: null,
                plugin_list: [
                    {
                        plugin_name: "TranslatePress",
                        plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                    },
                    {
                        plugin_name: "TranslatePress",
                        plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                    }
                ],
                plugin_information: 1,
                plugin_name: "TranslatePress",
                plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
            },


        }
    },
    {
        projectType: "Fixed",
        projectData: {
            client: {
                name: "Jill De",
                country: {
                    iso: "au",
                    nicename: "Australia",
                    country_id: 13,
                },
                image_url: "ghdfdhf",
                client_id: 251,
            },
            pm: {
                name: "Belayat Hossain",
                country: {
                    iso: "bd",
                    nicename: "Bangladesh",
                    country_id: 19,
                },
                image_url: "dghgfhg",
                pm_id: 1,
            },
            project: {
                start_date: "2021-09-01",
                deadline: "2021-09-30",
                project_id: 1,
                progress: 50,
                project_budget: 1000,
                upsell_actual_amount: 200,
                currency: "USD",
                currency_symbol: "$",
                deal: {
                    deal_id: 1,
                    original_currency: {
                        currency_code: "AUD",
                        amount: 650,
                    },
                    profile_link: "https://www.freelancer.com/u/mbjsolutions?from=messaging&ref_project_id=38007534",
                    message_link: [
                        "https://www.freelancer.com/messages/thread/326491443?filter=active",
                    ],
                    description2: `<p>E-commerce website on wordpress</p>`,
                    description3: `<p>1. The site will be on Wordpress</p>

                    <p>2. The site will have standard e-commerce functionalities</p>
                    
                    <p>3. The currency will be GBP</p>
                    
                    <p>4. pages -&nbsp;Home, categories, products, contact, blog, add to cart, checkout, user account</p>
                    
                    <p>5. There will be 12 products in total that will be uploaded by us.</p>
                    
                    <p>6.&nbsp;The design will be custom modern design similar to <a href="https://www.freelancer.com/users/l.php?url=https:%2F%2Fwww.kolkol.co.za%2Fhottubs.php&amp;sig=b23b9c4a06c889e25185e8de2c797744ec1c23d38f973deb396635d88f4d2fe9" target="_blank">https://www.kolkol.co.za/hottubs.php</a></p>
                    
                    <p>7.&nbsp;Images and all information will be used from the reference site as well, the client will share 'about us' content, and the rest will be collected from the reference site.</p>
                    
                    <p>8. We&nbsp;will integrate a payment gateway of the client's&nbsp;choice.</p>
                    
                    <p>9. We need to transform the client's logo from JPEG to PSD or Ai</p>
                    
                    <p>&nbsp;</p>
                    
                    <p>&nbsp;</p>`,
                    description4: `<p><a href="https://www.freelancer.com/users/l.php?url=https:%2F%2Fwww.kolkol.co.za%2Fhottubs.php&amp;sig=b23b9c4a06c889e25185e8de2c797744ec1c23d38f973deb396635d88f4d2fe9" target="_blank">https://www.kolkol.co.za/hottubs.php</a></p>`,
                    description5: `<p>Please complete the project before mid-next week.&nbsp;</p>`,
                    description6: `<ol><li>Godaddy:</li><li>User:&nbsp;john@cartagenafishing.com</li><li>Pass:&nbsp;Isla24680!!!</li></ol><div>WordPress:</div><div>URL:&nbsp;https://cartagenafishing.com/wp-admin</div><div>User:&nbsp;john@cartagenafishing.com</div><div>Pass:&nbsp;I2n%w4yQZdG0K0IPt4UEVeGm</div><app-messaging-message-details _ngcontent-webapp-c215="" _nghost-webapp-c178="" class="ng-star-inserted" style="display: flex; float: right; margin-left: 8px; color: rgb(0, 0, 0); font-family: Roboto, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: medium; background-color: rgb(240, 240, 240);"></app-messaging-message-details>`,
                    description7: `<p>You can take from the existing site, but I asked the raw logo file. If he can't provide the raw file, we will sell our logo service, also the logo doesn't look good, we will try to sell this logo service after the project is accepted. Please let me know once you accept the project.&nbsp;</p>`,
                    description8: `<p>We should be able to get seo and google ad work from him if this project goes well, he should be a well paying client&nbsp;&nbsp;</p>`,
                    description9: `<p>Asked for partial release as you show progress of the work.</p>`,

                },
                project_summary: `<p><strong>We need to fix the product main Image to high resulation dynamically.</strong><br>
                <strong>Website:</strong>&nbsp;https://homedesignstoreflorida.com/</p>
                
                <p><br>
                <strong>Task Details:&nbsp;</strong></p>
                
                <ul>
                    <li>Every single product page, The main product image is looks blury even on uploading high resulation images:&nbsp;https://prnt.sc/bceeih0I4kuV&nbsp;</li>
                    <li>We need implement on global solution, So that every product images will look on perfect resulation.&nbsp;</li>
                    <li>As it is Global solution, It should be applied for all products and upcoming products.&nbsp;</li>
                </ul>
                
                <p><strong>Solution:&nbsp;</strong></p>
                
                <ul>
                    <li>Main loading pic is cropped by 450*320. We need to change this to 1024px width in template code:&nbsp;https://prnt.sc/5quIKtB74suH&nbsp;</li>
                    <li>It is just a quick fix. Submit it to me on Monday.</li>
                </ul>
                
                <p><strong>Website access:&nbsp;<br>
                Domain</strong> - https://homedesignstoreflorida.com/<br>
                Platform- Shopify<br>
                homedsignstore@gmail.com<br>
                Password - Shopify123//</p>`,
                project_challenges: "Nothing to mention here",
                comment: "Nothing to mention here",
                requirement_defined: "Ok but milestone breakdown was wrong and it is confusing. Sale team can change the milestone breakdown while making the milestione.. Otherwise it can be a issue if the client will go for any intentional issue.",
                deadline_meet: "yes, but need to be careful because of Eid vacation.",
            },
            working_environment: {
                site_url: "https://homedesignstoreflorida.com/",
                frontend_password: "Shopify123//",
                login_url: "https://homedesignstoreflorida.com/admin",
                email: "seopageone@gamil.com",
                password: "Isla24680!!!",
            },
            pm_task_guideline: {
                theme_details: 1,
                theme_name: "Broadcast",
                theme_url: "https://woodmart.xtemos.com/",
                design_details: 1,
                design: "The Reference Site That Has to Be Clone",
                xd_url: "https://xd.adobe.com/view/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b/",
                drive_url: "https://drive.google.com/drive/folders/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b",
                reference_link: ["https:www.nietiet.gmbh", "https:kapsafill.de"],
                instruction: `<p>This is not a reference for cloning or doing the design same, we just take inspiration from the color and the way the wordings are.&nbsp;</p>`,
                primary_color: "#610D14",
                primary_color_description: `<p>Theme-based color. use color from the theme demo</p>`,
                color_schema: 1,
                color: ["#222222", "#FFFFFF", "#C09631"],
                color_description: ["<p>Body text color<p>", "<p>Dark background text color<p>", "<p>Dark background title color. Same as demo<p>"],
                plugin_research: 1,
                plugin_name: "TranslatePress",
                plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                google_drive_link: "https://drive.google.com/drive/folders/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b",
                instruction_plugin: `<p>You can use this plugin for migrating the website</p>`
            },
            task_guideline_authorization: [
                {
                    id: 1,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Theme Details",
                    status: null,
                },
                {
                    id: 2,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Design Details",
                    status: null,

                },
                {
                    id: 3,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Color Schema",
                    status: null,
                },
                {
                    id: 4,
                    task_guideline_id: 1,
                    project_id: 1,
                    name: "Plugin Research",
                    status: null,
                }
            ],
            project_submission: {
                actual_link: "https://homedesignstoreflorida.com/",
                dummy_link: "https://homedesignstoreflorida.com/",
                qc_protocol: 1,
                login_yes: 1,
                login_information: 1,
                login_url: "https://homedesignstoreflorida.com/admin",
                login: 'ian_truckyeah@test.com',
                password: "Isla24680!!!",
                screenshot: "https://prnt.sc/3FwufLmLIirf",
                drive_yes: 1,
                drive_information: 1,
                google_link: "https://drive.google.com/drive/folders/1b1b4b3b-0b3b-4b3b-8b3b-3b3b3b3b3b3b",
                rating: 5,
                comments: `I had to fix many things like the slider button icon, Button style, and Bioimage. 
                It took much time compared to the task difficulties.`,
                requirements: 10,
                comments2: `ok`,
                price: 8,
                comments3: `ok`,
                niche: "E-commerce",
                category_name: "E-commerce",
                dummy_information: 1,
                notify: 1,
                actual_yes: 1,
                admin_comment: null,
                // admin_comment: `<p>Yes, This website functions are very complex... There are lots of data that is much problems and not properly sequenced&nbsp;</p>`,
            },
            project_portfolio: {
                cms_name: "WordPress",
                website_type: "E-commerce",
                category_name: "E-commerce",
                main_page_number: 5,
                main_page_name: "Home Page",
                secondary_page_number: 5,
                secondary_page_name: "About Page",
                backup_email_address: 'admin@gmail.com',
                day_interval: "Every 7 days",
                description: `<p>Yes, This website functions are very complex... There are lots of data that is much problems and not properly sequenced&nbsp;</p>`,
                theme_id: 1,
                website_theme: {
                    theme_name: "Broadcast",
                    theme_url: "https://woodmart.xtemos.com/",
                },
                theme_name: null,
                theme_url: null,
                plugin_information: 1,
                plugin_name: "TranslatePress",
                plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                plugin_list: [
                    {
                        plugin_name: "TranslatePress",
                        plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                    },
                    {
                        plugin_name: "TranslatePress",
                        plugin_url: "https://wordpress.org/plugins/translatepress-multilingual/",
                    }
                ],
            }


        }
    }

]


export const ProjectQualityControlDummyData = {
    stepOne: [
        {
            id: 1,
            title: 'Checked the site is loading with https:// or not? If not, please add SSL and confirm.',
            key: 'site_https',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 2,
            title: "Checked the site is loading with favicon or not? If not, please add and confirm.",
            key: 'favicon',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 3,
            title: `Checked whether the client was using web mails or not? If yes, 
        please confirm that the webmail is working perfectly.`,
            key: 'webmail',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 4,
            title: `Checked whether the contact forms are working properly? If not, please add your
        own email and test that it's working properly with captcha. After testing, 
        add client's email.`,
            key: 'contact_form',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 5,
            title: `Checked the social media links are working perfectly? If not, please check that
        those links are working perfectly and confirm.`,
            key: 'social_media',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 6,
            title: `Checked whether the login, register, other top bar links, and footer links are
        working properly or not? If not, please fix it and confirm`,

            key: 'login_link',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 7,
            title: `Visited the website and scroll down from the top to bottom for all main pages like
        home, about, service, product page, product category page and confirm that
        images and the sections are aligned properly.`,
            key: 'scroll_down',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 8,
            title: `Checked whether there is any lorem ipsum text or not? If not, please fix them. If
        agreement was to keep lorem ipsum text, keep them as agreement says.`,
            key: 'lorem_text',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 9,
            title: `<p>Did you check if there are any logical issues like need attention or not? If not
        checked, please check for issues and fix them. Example Issue (In this case, this
        form field will allow registration from people whose credit card will expire in a few
        months (4 months). Nobody else will be able to register/reserve a vehicle. For
        example, I personally have a few credit cards and the earliest expiration date is
        in 2024. So if I want to reserve a vehicle here, I can’t because there is no provision
         to pick a year after 2022. Look for such logical issues on the site, specially in the
        sections where there are functionalities.</p>
        <br/>
        <p> Screenshot:  <a href="https://prnt.sc/ZCOCTbJiQorn" target="_blank">https://prnt.sc/ZCOCTbJiQorn</a> </p>`,
            key: 'logical_issues',
            value: null,
            isDangerHtml: true,
        },
        {
            id: 10,
            title: `Checked the site's loading speed? If not, run test on GTmetrix and make sure the
        score is more than 55 and check Pingdom tool to check the page size. Ensure that
        the site meet our highest standard.`,
            loading_speed: null,
            key: 'loading_speed',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 11,
            title: `Visited the website and scroll down from the top to bottom for all main pages like
        home, about, service, product page, product category page and confirm that
        images and the sections are aligned properly.`,
            mobile_speed: null,
            key: 'mobile_speed',
            value: null,
            isDangerHtml: false,
        }
    ],
    stepTwo: [
        {
            id: 1,
            title: `Checked if the site was already migrated to the live server or not. If yes, make sure
        it is indexed and followed for search engines. Our developers normally no index a
        site from 2 places. One, from the “Reading” menu under “settings” where they select
        the option “Discourage search engines to crawl this site”. Another is robots txt. Here
        is its written “Disallow: /”, that means the entire site is blocked for bots. Need to
        remove both to make the site crawlable for the bots.`,
            key: 'migration',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 2,
            title: `Checking if all the links are working fine or not? In many cases, we saw that there
        are hashtag links, and IP address links even after the site is migrated. Please run
        a full-site check and fix where needed.`,
            key: 'links_working',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 3,
            title: `Added a backup plugin that can store and send backups to clients' email once per
        week. Ask the client for the email where he wants the backups to be stored.`,
            key: 'backup_plugin',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 4,
            title: `Add an uptime monitoring plugin. Add client's email and 1-2 of our emails there,
        including developers@seopage1.net and Rajat07me@gmail.com So both clients,
        and we get notified as soon as the site is down.`,
            key: 'uptime_monitoring',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 5,
            title: `Keep a backup of the final website (This may be needed in case the client comes
          back after a few months and claims something was not done after that thing got
          messed up somehow).`,
            key: 'final_backup',
            value: null,
            isDangerHtml: false,
        },
        {
            id: 6,
            title: `<p>Fill in the site title and tagline.</p>  <br/> <p>Go to settings</p> <br/>
            <p>General to find this: <a href="https://prnt.sc/xFoLFQjiqiLj" target="_blank">https://prnt.sc/xFoLFQjiqiLj </a> </p> <p>Put a nice title of 60 characters max in the title field
        (based on competitors) and a relevant tagline/slogan. For the tagline, you can check
        with the client or if the client asks to put any of our choice, we can just put it.</p>`,
            key: 'slogan',
            value: null,
            isDangerHtml: true,
        }
    ],

}


export const ProjectDisputeAuthorizationsData = [
    {
        id: 1,
        title: "Dispute Date",
        key: "created_at",
        value: null,
    },
    {
        id: 2,
        title: "Client User Name",
        key: "client_username",
        value: null,
    },
    {
        id: 3,
        title: "Project Value",
        key: "project_value",
        value: null,
    },
    {
        id: 4,
        title: "What Was The Project About!",
        key: "description1",
        value: null,
    },
    {
        id: 5,
        title: "What percentage of the amount is in dispute? Also, write the amount in dispute separately.(for example 60% and 300 USD)",
        key: "description2",
        value: null,
    },
    {
        id: 6,
        title: "Did they release the amount that is not in dispute? Or did they release any amount at all? ",
        key: "description3",
        value: null,
    },
    {
        id: 7,
        title: `Which Phase We Were At When This Issue Occurred?
        (Requirements Define, Research/Planning, Execution
        (Mention The Percentage Of Execution That Was Done),
        QC, Revisions And Feedback)`,
        key: "description4",
        value: null,
    },
    {
        id: 8,
        title: `What Is The Issue Here? (Dispute/Milestone
        Cancelation/Project Cancelation/Client
        Complaining To Freelancer.Com)`,
        key: "description5",
        value: null,
    },
    {
        id: 9,
        title: `According To You, Which Of Our Team/Individuals Is 
        Responsible For This Exactly? (You Could Not Manage
        The Project Properly/The Sales Team Brought The Wrong
        Project/The Developers Messed Up Or
        Anything Else. Write In Detail)`,
        key: "description6",
        value: null,
    },
    {
        id: 10,
        title: `Was The Work Delivered Fully To The Clients Satisfaction
        And As Per The Agreed Job Scope?`,
        key: "description7",
        value: null,
    },
    {
        id: 11,
        title: `What Was The Deadline And Was The Deadline Met?`,
        key: "description8",
        value: null,
    },
    {
        id: 12,
        title: `What Was The Work About (You Can Share
            The Instruction File) (Optional)`,
        key: "description9",
        value: null,
    }, {
        id: 13,
        title: `Describe The Reason Why We Are Here. In Other Words,
        Write Down Why The Client Is This Much Dissatisfied And
        Thinks Of Such Extreme Steps.`,
        key: "description10",
        value: null,
    },
    {
        id: 14,
        title: `When Did The Client Get Dissatisfied The 1st Time (Write
            The Date, The Reason, What He Demanded And What
            Measures Were Taken From Your Side After That)`,
        key: "description11",
        value: null,
    },
    {
        id: 15,
        title: `When Did The Client Get Dissatisfied The 2nd Time?
        (Write Down The Date, The Reason, What He Demanded
        And What Measures Were Taken After That)`,
        key: "description12",
        value: null,
    },
    {
        id: 16,
        title: `When Did The Client Get Dissatisfied The 3rd Time?
        (Write Down The Date, The Reason, What He Demanded
        And What Measures Were Taken From Your Side After That)`,
        key: "description13",
        value: null,
    },
    {
        id: 17,
        title: `List Down Your Weaknesses/Shortcomings/Lackings
        During This Project. Please Be Honest And Do Not Hide
        Anything. That Is In The Best Interest
        Of You And The Company!`,
        key: "description14",
        value: null,
    },
    {
        id: 18,
        title: `If We Have To Win Here, What Is The Percentage And
        Value Of The Amount We Should Realistically Claim
        (According To You)?`,
        key: "description15",
        value: null,
    },
    {
        id: 19,
        title: `Write Down Anything That You Did Not Specifically
        Mention Above. Remember, If We Are Not Aware Of
        Anything And The Client Blindsides Us During The
        Arbitration, The Case Will Become Very Weak And It
        Will Be Close To Impossible For Us To Win It!`,
        key: "description16",
        value: null,
    },
    {
        id: 20,
        title: `Please Confirm All The Above Details Are Correct &
        Complete & No Information Was Hidden For The Client
        To Blindside Us. Repetition Of Such Things May Lead To
        Tougher Actions From The Company As In
        A Showcause Letter, Cash Penalty Etc.`,
        key: "description17",
        value: null,
    },
    {
        id: 21,
        title: `Project Manager Name`,
        key: "pm_name",
        value: null,
    },
    {
        id: 22,
        title: `Project Manager Email`,
        key: "pm_email",
        value: null,
    },
    {
        id: 23,
        title: `Admin Comment`,
        key: "dispute_admin_comment",
        value: null,
    }
]

export const ProjectDeadlineHistoryDummyData = [
    {
        id: 1,
        previous_deadline: "2021-09-30",
        requested_on: "2021-09-20",
        reason: `<p>You can use this plugin for migrating the website</p>`,
        request_status: "Pending",
        approved_on: null,
        approved_by_name: null,
        extended_deadline: null,
        approved_by_id: null,
        approved_by_photo: null,
    },
    {
        id: 2,
        previous_deadline: "2021-09-30",
        requested_on: "2021-09-20",
        reason: `<p>You can use this plugin for migrating the website</p>`,
        request_status: "Approved",
        approved_on: "2021-09-21",
        approved_by_name: "Belayat Hossain",
        extended_deadline: "2021-10-05",
        approved_by_id: 1,
        approved_by_photo: "https://www.freelancer.com/u/mbjsolutions?from=messaging&ref_project_id=38007534",
    },
    {
        id: 3,
        previous_deadline: "2021-09-30",
        requested_on: "2021-09-21",
        reason: `<p>You can use this plugin for migrating the website</p>`,
        request_status: "Approved",
        approved_on: "2021-09-22",
        approved_by_name: "John Doe",
        extended_deadline: "2021-10-05",
        approved_by_id: 2,
        approved_by_photo: "https://www.example.com/user2",
    },
    {
        id: 4,
        previous_deadline: "2021-09-30",
        requested_on: "2021-09-21",
        reason: `<p>You can use this plugin for migrating the website</p>`,
        request_status: "Approved",
        approved_on: "2021-09-22",
        approved_by_name: "John Doe",
        extended_deadline: "2021-10-05",
        approved_by_id: 2,
        approved_by_photo: "https://www.example.com/user2",
    },
    {
        id: 5,
        previous_deadline: "2021-09-30",
        requested_on: "2021-09-22",
        reason: `<p>You can use this plugin for migrating the website</p>`,
        request_status: "Approved",
        approved_on: "2021-09-23",
        approved_by_name: "Jane Smith",
        extended_deadline: "2021-10-05",
        approved_by_id: 3,
        approved_by_photo: "https://www.example.com/user3",
    },
    {
        id: 6,
        previous_deadline: "2021-09-30",
        requested_on: "2021-09-22",
        reason: `<p>You can use this plugin for migrating the website</p>`,
        request_status: "Approved",
        approved_on: "2021-09-23",
        approved_by_name: "Jane Smith",
        extended_deadline: "2021-10-05",
        approved_by_id: 3,
        approved_by_photo: "https://www.example.com/user3",
    }
];



export const DetailsSalesExecutiveConstant = {
    wordsHere2_8: {
        title: "Write the what in 2-8 words here? ",
        infoText: "Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.",
    },
    linesHere3_4: {
        title: `Elaborate the "WHAT" 3-4 lines here`,
        infoText: "Examples: The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog, and contact. The look and feel should be better than the references",
    },
    referenceWebsite: {
        title: "Reference websites and what the references are for",
        infoText: "Examples: ABC.com is for the color scheme. XYZ.com is for section layouts DEF.com is for header & footer styling. However, none of these can be copied.",
    },
    clientConcern: {
        title: "Any particular focus/concern of the client",
        infoText: "Examples: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work the way he wants. ",
    },
    logoReference: {
        title: "Logo Reference",
        infoText: "Upload the google drive link here. Always ask for PSD and AI files so they are editable",
    },
    requiredLogins: {
        title: "Required Logins",
        infoText: "Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register",
    },
    involvedProject: {
        title: "If there is any cross-departmental work involved in this project",
        infoText: "Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development",
    },
}



export const ProjectProgressStatus = [
    {
        id: 1,
        name: "Under Revision",
        color: "#D21010",
        tag: "under_revision",
        count: 0
    },
    {
        id: 2,
        name: "To Do",
        color: "#F5C308",
        tag: "to_do",
        count: 0
    },
    {
        id: 3,
        name: "Doing",
        color: "#00B5FF",
        tag: "doing",
        count: 0
    },
    {
        id: 4,
        name: "Completed",
        color: "#679C0D",
        tag: "completed",
        count: 0
    },
    {
        id: 5,
        name: "Under Review",
        color: "#E7D107",
        tag: "under_review",
        count: 0
    },
    {
        id: 6,
        name: "Overdue",
        color: "#F00",
        tag: "overdue",
        count: 0
    },
    {
        id: 7,
        name: "Awaiting App.",
        color: "#3D0AF5",
        tag: "awaiting_app",
        count: 0
    },
    {
        id: 8,
        name: "Submitted Task",
        color: "#F50AD5",
        tag: "submitted_task",
        count: 0
    }
]


export const HourlyProjectSalesData = [

]

export const ProjectBudgetData = {
    project_budget: [
        {
            id: 1,
            title: "Project Budget",
            price: '',
            currency: "",
            currency_symbol: "",
            key: "project_budget",
            icon: "/images/dollar-circle.png"
        },
        {
            id: 2,
            title: "Project Budget",
            price: "",
            currency: "",
            currency_symbol: "",
            key: "amount",
            icon: "/images/money-tick.png"
        }
    ],
    upsold_amount: [
        {
            id: 1,
            title: "Upsold Amount",
            price: "",
            currency: "",
            currency_symbol: "",
            key: "upsell_amount",
            icon: "/images/dollar-circle.png"
        },
        {
            id: 2,
            title: "Upsold Amount",
            price: "",
            currency: "",
            currency_symbol: "",
            key: "upsell_actual_amount",
            icon: "/images/money-tick.png"
        }
    ],
    hours_logged: [
        {
            id: 1,
            title: "Estimated Time",
            time: "",
            key: "estimate_time_in_hours",
            icon: "/images/timer.png"
        },
        {
            id: 2,
            title: "Hours Logged",
            time: "",
            key: "logged_time_in_hours",
            icon: "/images/timer.png",
        },

    ],
    earning_expenses: [

        {
            id: 1,
            title: "Earnings",
            price: "",
            currency: "",
            currency_symbol: "",
            key: "earnings",
            icon: "/images/dollar-circle.png"
        },
        {
            id: 2,
            title: "Earnings",
            price: "",
            currency: "",
            currency_symbol: "",
            key: "actual_earnings",
            icon: "/images/money-tick.png"
        },
        {
            id: 3,
            title: "Expenses",
            price: "",
            currency: "",
            currency_symbol: "",
            key: "total_expenses",
            icon: "/images/dollar-circle.png"
        }
    ],
    hourlyProjectSalesData: [
        {
            id: 1,
            question: "Is the amount of work he expects per hour realistic?",
            answer: "",
            key: "expect_amount"

        },
        {
            id: 2,
            question: `Does the client have any certain amount of hours on mind for the
            first set of tasks?`,
            answer: "",
            key: "certain_amount_hour"
        },
        {
            id: 3,
            question: "For how long the project may continue?",
            answer: "",
            key: "long_project"
        }
    ]

}


export const DashboardTaskTableData = [
    {
        "task_id": 1,
        "task_name": "Task 1: This is a placeholder task name for Task 1, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2021-09-01",
        "due_date": "2021-09-30",
        "status": "Completed",
        "tracking_start_time": "2021-09-01 10:00:00",
        "estimated_hours": "10",
        "logged_hours": "5"
    },
    {
        "task_id": 2,
        "task_name": "Task 2: This is a placeholder task name for Task 2, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2021-10-05",
        "due_date": "2021-10-31",
        "status": "Doing",
        "tracking_start_time": "2021-10-05 09:00:00",
        "estimated_hours": "15",
        "logged_hours": "8"
    },
    {
        "task_id": 3,
        "task_name": "Task 3: This is a placeholder task name for Task 3, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2021-11-15",
        "due_date": "2021-12-15",
        "status": "Completed",
        "tracking_start_time": "2021-11-15 08:30:00",
        "estimated_hours": "20",
        "logged_hours": "10"
    },
    {
        "task_id": 4,
        "task_name": "Task 4: This is a placeholder task name for Task 4, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-01-03",
        "due_date": "2022-01-31",
        "status": "Completed",
        "tracking_start_time": "2022-01-03 11:00:00",
        "estimated_hours": "8",
        "logged_hours": "8"
    },
    {
        "task_id": 5,
        "task_name": "Task 5: This is a placeholder task name for Task 5, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-02-10",
        "due_date": "2022-03-10",
        "status": "To Do",
        "tracking_start_time": null,
        "estimated_hours": "12",
        "logged_hours": "0"
    },
    {
        "task_id": 6,
        "task_name": "Task 6: This is a placeholder task name for Task 6, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-03-20",
        "due_date": "2022-04-20",
        "status": "To Do",
        "tracking_start_time": null,
        "estimated_hours": "18",
        "logged_hours": "0"
    },
    {
        "task_id": 7,
        "task_name": "Task 7: This is a placeholder task name for Task 7, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-05-05",
        "due_date": "2022-05-31",
        "status": "Doing",
        "tracking_start_time": "2022-05-05 08:00:00",
        "estimated_hours": "25",
        "logged_hours": "12"
    },
    {
        "task_id": 8,
        "task_name": "Task 8: This is a placeholder task name for Task 8, providing the minimum length required to meet the requested 150 character requirement. This is just filler text to demonstrate the format of the JSON array.",
        "creation_date": "2022-06-15",
        "due_date": "2022-07-15",
        "status": "Doing",
        "tracking_start_time": "2022-06-15 10:15:00",
        "estimated_hours": "30",
        "logged_hours": "15"
    }
]
export const DashboardMileStoneTableData = [
    {
        "milestone_id": 1,
        "milestone_name": "Updated Milestone 1",
        "milestone_cost": "600",
        "milestone_currency": "EUR",
        "milestone_currency_symbol": "€",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 2,
        "milestone_name": "Special Achievement",
        "milestone_cost": "750",
        "milestone_currency": "GBP",
        "milestone_currency_symbol": "£",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    },
    {
        "milestone_id": 3,
        "milestone_name": "Goal Reached",
        "milestone_cost": "400",
        "milestone_currency": "CAD",
        "milestone_currency_symbol": "CA$",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 4,
        "milestone_name": "New Phase Initiated",
        "milestone_cost": "550",
        "milestone_currency": "AUD",
        "milestone_currency_symbol": "A$",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    },
    {
        "milestone_id": 5,
        "milestone_name": "Achievement Unlocked",
        "milestone_cost": "800",
        "milestone_currency": "JPY",
        "milestone_currency_symbol": "¥",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 6,
        "milestone_name": "Next Level Attained",
        "milestone_cost": "350",
        "milestone_currency": "CHF",
        "milestone_currency_symbol": "CHF",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    },
    {
        "milestone_id": 7,
        "milestone_name": "Victory Unleashed",
        "milestone_cost": "700",
        "milestone_currency": "INR",
        "milestone_currency_symbol": "₹",
        "creation_date": "2021-09-30",
        "status": "Paid"
    },
    {
        "milestone_id": 8,
        "milestone_name": "Triumph Achieved",
        "milestone_cost": "600",
        "milestone_currency": "CNY",
        "milestone_currency_symbol": "¥",
        "creation_date": "2021-09-30",
        "status": "Unpaid"
    }
]



