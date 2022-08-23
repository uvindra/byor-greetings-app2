# choreo-organization-management
This repository may contain choreo organization management related functionalities.

## Prerequisites
- Ballerina SwanLake 2201.0.3
- MSSQL Database

## Developer Guide

### Database Initialization
1. Download the `choreo_app_db` database schema from this [location](https://github.com/wso2-enterprise/choreo-control-plane/blob/main/databases/scripts/choreo_app_db_mssql.sql).
2. Then replace the `create user` section at the top of the file with the following code segment.
```
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'choreo_app_db')
    BEGIN
        CREATE DATABASE choreo_app_db;
    END
GO

USE choreo_app_db;
GO
```
3. Execute the following command to create the database and tables.
```
sqlcmd -S <database host name> -U <database user name> -P <database password> -i choreo_app_db_mssql.sql
```
4. Populate the database with following commands.
Add an organization to the table.
```
INSERT INTO [organization] (uuid, name, handle, created_at, updated_at) VALUES ('<Your Org UUID>', '<Your Org Name>', '<Your Org Handle>', '2022-08-22 00:00:00.000', '2022-08-22 00:00:00.000');
```
Get the `id` from the `organization` table and execute the following command to add admin role.
```
INSERT INTO [role] (display_name, handle, description, organization_id, default_role, created_by, updated_by, created_at, updated_at) VALUES ('Admin', 'admin', 'Organization admin role', '<Added Organization ID>', 1, '<Added Organization ID>', '<Added Organization ID>', '2022-08-22 00:00:00.000', '2022-08-22 00:00:00.000');
```
Add new user.
```
INSERT INTO [user] (idp_id, is_anonymous, is_enterprise, created_at, updated_at) VALUES ('<Your IDP ID>', 0, 0, '2022-08-22 00:00:00.000', '2022-08-22 00:00:00.000');
```
Get the `role id` from role table & `user id` from the [user] table and add role-member mapping.
```
INSERT INTO role_member_mapping (role_id, user_id, created_at, updated_at) VALUES ('<role id>', '<user id>', '2022-08-22 00:00:00.000', '2022-08-22 00:00:00.000');
```

### Modifying 'ThemeConfig' record type
If you do any change to the `ThemeConfig` type, you need to invoke the theme migration resource to migrate the data in the database.
You can find default values for the newly added fields from [here](https://github.com/wso2-enterprise/choreo-console/blob/main/src/modules/settings/organization/Theme/defaults.json).

**COMPULSORY STEP:** You should update `OLD_THEME_VERSION` & `LATEST_THEME_VERSION` with the immediate old theme version and the latest theme version respectively in [configs.bal](modules/configs/configs.bal).
### How to use theme migration resource?
- You can invoke `orgs/themes/migrate` resource with a valid token of the control-plane/choreo-system organization admin user
- Sample request body:
```
{
    "addingItems": {
        "assets": {
            "logoUrl": {
                "favicon": "https://devportal.preview-dv.choreo.dev/themes/default/images/favicon.ico"
            }
        },
        "footerLinks": {
            "terms": "https://wso2.com/choreo/terms-of-use/",
            "privacyPolicy": "https://wso2.com/choreo/privacy-policy/",
            "support": "https://wso2-choreo.slack.com/join/shared_invite/zt-qm86tg1f-R2kXf~26GB6X6Ux0GcuYbQ#/shared-invite/email"
        }
    },
    "removingItems": ["assets-logoUrl-header", "palette-background-secondary"]
}
```
- Here, `addingItems` object should contain newly added fields to the theme configuration with default values.
`removingItems` should be an array of strings containing keys to be removed.
