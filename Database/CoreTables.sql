

Create Table [NOTES] (
    [USER_EMAIL] nvarchar(150) not null,
    [NOTE_NAME] nvarchar(150) not null,
    [CREATED_DATE] datetime not null default(getutcdate()),
    [NOTE_CONTENT] nvarchar(max) not null
)