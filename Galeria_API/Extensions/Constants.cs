namespace Galeria_API.Extensions
{
    public class Constants
    {
        //this policy is used to permit access to everything
        public const string PolicyNameAdmin = "Admin";

        //this policy is used to permit access to uploading and downloading pictures, to the pictures itself and to its panel.
        public const string PolicyNameUploadingDownloading = "UploadingDownloading";

        //this policy is used to permit access to pictures and to its panel, but not to downloading it
        public const string PolicyNameOnlyWatch = "OnlyWatch";


        //*****************
        public const string RoleNamePainter = "Painter";
        public const string RoleNameNormalUser = "NormalUser";
        public const string RoleNameAdmin = "Admin";
    }
}
