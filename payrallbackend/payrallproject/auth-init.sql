IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [EmployeeCategories] (
    [Id] int NOT NULL IDENTITY,
    [CategoryName] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    [DaySalarybased] bit NULL,
    [IsActive] bit NULL,
    CONSTRAINT [PK_EmployeeCategories] PRIMARY KEY ([Id])
);

CREATE TABLE [Holiday] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Date] datetime2 NOT NULL,
    [Description] nvarchar(200) NOT NULL,
    [IsRecurring] bit NOT NULL,
    [HolidayType] nvarchar(50) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NULL,
    CONSTRAINT [PK_Holiday] PRIMARY KEY ([Id])
);

CREATE TABLE [OT] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [Rate] decimal(18,2) NULL,
    [IsActive] bit NULL,
    CONSTRAINT [PK_OT] PRIMARY KEY ([Id])
);

CREATE TABLE [Roles] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [NormalizedName] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
);

CREATE TABLE [User] (
    [Id] int NOT NULL IDENTITY,
    [Email] nvarchar(max) NULL,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [UserName] nvarchar(max) NULL,
    [NormalizedUserName] nvarchar(max) NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id])
);

CREATE TABLE [Departments] (
    [Id] int NOT NULL IDENTITY,
    [DepartmentName] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    [EmployeeCategoriesId] int NULL,
    [IsActive] bit NULL,
    CONSTRAINT [PK_Departments] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Departments_EmployeeCategories_EmployeeCategoriesId] FOREIGN KEY ([EmployeeCategoriesId]) REFERENCES [EmployeeCategories] ([Id])
);

CREATE TABLE [PasswordResetTokens] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NULL,
    [Token] nvarchar(max) NULL,
    [ExpiryDate] datetime2 NULL,
    CONSTRAINT [PK_PasswordResetTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PasswordResetTokens_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
);

CREATE TABLE [UserRoles] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NULL,
    [RolesId] int NULL,
    CONSTRAINT [PK_UserRoles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserRoles_Roles_RolesId] FOREIGN KEY ([RolesId]) REFERENCES [Roles] ([Id]),
    CONSTRAINT [FK_UserRoles_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
);

CREATE TABLE [Employe] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeNumber] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [Address] nvarchar(max) NULL,
    [FullName] nvarchar(max) NULL,
    [Nic] nvarchar(max) NULL,
    [JoinedDate] datetime2 NULL,
    [TerminationDate] datetime2 NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [DepartmentID] int NULL,
    [EmployeeCategoriesID] int NULL,
    [BasicSalary] int NULL,
    [DaySalary] int NULL,
    [KpiRate] int NULL,
    [KpiAmount] int NULL,
    [Bra1] int NULL,
    [Bra2] int NULL,
    [IsActive] bit NULL,
    [BankAccountNumber] nvarchar(max) NULL,
    [BankName] nvarchar(max) NULL,
    [BankBranch] nvarchar(max) NULL,
    [TaxIdentificationNumber] nvarchar(max) NULL,
    [HasTaxExemption] bit NULL,
    [TotalCompensation] int NULL,
    CONSTRAINT [PK_Employe] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Employe_Departments_DepartmentID] FOREIGN KEY ([DepartmentID]) REFERENCES [Departments] ([Id]),
    CONSTRAINT [FK_Employe_EmployeeCategories_EmployeeCategoriesID] FOREIGN KEY ([EmployeeCategoriesID]) REFERENCES [EmployeeCategories] ([Id])
);

CREATE TABLE [EmployeeOvertimes] (
    [Id] int NOT NULL IDENTITY,
    [EmployeId] int NULL,
    [OtId] int NULL,
    [DateWorked] datetime2 NULL,
    [HoursWorked] int NULL,
    [Remarks] nvarchar(max) NULL,
    [Amount] decimal(18,2) NULL,
    CONSTRAINT [PK_EmployeeOvertimes] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_EmployeeOvertimes_Employe_EmployeId] FOREIGN KEY ([EmployeId]) REFERENCES [Employe] ([Id]),
    CONSTRAINT [FK_EmployeeOvertimes_OT_OtId] FOREIGN KEY ([OtId]) REFERENCES [OT] ([Id])
);

CREATE TABLE [LeaveBalances] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeId] int NOT NULL,
    [LeaveType] nvarchar(20) NOT NULL,
    [Year] int NOT NULL,
    [EntitledDays] decimal(5,2) NOT NULL,
    [UsedDays] decimal(5,2) NOT NULL,
    [BalanceDays] decimal(5,2) NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    [UpdatedDate] datetime2 NULL,
    CONSTRAINT [PK_LeaveBalances] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_LeaveBalances_Employe_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employe] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Leaves] (
    [Id] int NOT NULL IDENTITY,
    [EmployeID] int NOT NULL,
    [Year] int NOT NULL,
    [AnnualLeavesAllocated] float NOT NULL,
    [AnnualLeavesUsed] float NOT NULL,
    [CasualLeavesAllocated] float NOT NULL,
    [CasualLeavesUsed] float NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    [UpdatedDate] datetime2 NOT NULL,
    CONSTRAINT [PK_Leaves] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Leaves_Employe_EmployeID] FOREIGN KEY ([EmployeID]) REFERENCES [Employe] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Leaves2] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeId] int NOT NULL,
    [StartDate] datetime2 NOT NULL,
    [EndDate] datetime2 NOT NULL,
    [IsHalfDay] bit NOT NULL,
    [IsFirstHalfDay] bit NULL,
    [NumberOfDays] decimal(3,1) NOT NULL,
    [LeaveType] nvarchar(20) NOT NULL,
    [Reason] nvarchar(500) NULL,
    [Status] nvarchar(20) NOT NULL,
    [Year] int NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    [UpdatedDate] datetime2 NULL,
    CONSTRAINT [PK_Leaves2] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Leaves2_Employe_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employe] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Loans] (
    [Id] int NOT NULL IDENTITY,
    [EmployeID] int NULL,
    [PrincipalAmount] decimal(18,2) NOT NULL,
    [TermMonths] int NOT NULL,
    [MonthlyInstallment] decimal(18,2) NOT NULL,
    [RemainingBalance] decimal(18,2) NOT NULL,
    [StartDate] datetime2 NOT NULL,
    [IsActive] bit NOT NULL,
    [Settled] bit NOT NULL,
    CONSTRAINT [PK_Loans] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Loans_Employe_EmployeID] FOREIGN KEY ([EmployeID]) REFERENCES [Employe] ([Id])
);

CREATE TABLE [NoPayDay] (
    [Id] int NOT NULL IDENTITY,
    [EmployeID] int NOT NULL,
    [Date] datetime2 NOT NULL,
    [Reason] nvarchar(max) NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    CONSTRAINT [PK_NoPayDay] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_NoPayDay_Employe_EmployeID] FOREIGN KEY ([EmployeID]) REFERENCES [Employe] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [NoPayEntries] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeId] int NOT NULL,
    [NoPayDate] datetime2 NOT NULL,
    [Reason] nvarchar(500) NULL,
    [CreatedDate] datetime2 NOT NULL,
    CONSTRAINT [PK_NoPayEntries] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_NoPayEntries_Employe_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employe] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [SalaryReports] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeId] int NOT NULL,
    [Year] int NOT NULL,
    [Month] int NOT NULL,
    [EmployeeName] nvarchar(max) NOT NULL,
    [EmployeeNumber] nvarchar(max) NOT NULL,
    [CategaryName] nvarchar(max) NOT NULL,
    [DepartmentName] nvarchar(max) NOT NULL,
    [WorkingDays] int NOT NULL,
    [Incentives] decimal(18,2) NOT NULL,
    [Bonus] decimal(18,2) NOT NULL,
    [SalaryAdvances] decimal(18,2) NOT NULL,
    [Loans] decimal(18,2) NOT NULL,
    [OtherDeductions] decimal(18,2) NOT NULL,
    [LeaveDays] int NOT NULL,
    [HalfDays] int NOT NULL,
    [NoPayDays] int NOT NULL,
    [Ot1Hours] decimal(18,2) NOT NULL,
    [Ot2Hours] decimal(18,2) NOT NULL,
    [FromDate] datetime2 NOT NULL,
    [ToDate] datetime2 NOT NULL,
    [AttendanceAllowance] decimal(18,2) NOT NULL,
    [TransportAllowance] decimal(18,2) NOT NULL,
    [FoodAllowance] decimal(18,2) NOT NULL,
    [MedicalAllowance] decimal(18,2) NOT NULL,
    [InternetAllowance] decimal(18,2) NOT NULL,
    [Wages] decimal(18,2) NOT NULL,
    [KpiAllowance] decimal(18,2) NOT NULL,
    [GrossSalary] decimal(18,2) NULL,
    [TotalDeductions] decimal(18,2) NOT NULL,
    [NetSalary] decimal(18,2) NULL,
    [EpfLiableSalary] decimal(18,2) NOT NULL,
    [Ot1Payment] decimal(18,2) NULL,
    [Ot2Payment] decimal(18,2) NULL,
    [TotalOtPayment] decimal(18,2) NULL,
    [Epf1] decimal(18,2) NOT NULL,
    [Epf2] decimal(18,2) NOT NULL,
    [Etf] decimal(18,2) NOT NULL,
    [EmployeeContribution] decimal(18,2) NOT NULL,
    [IsDaySalaryBased] bit NOT NULL,
    [GeneratedOn] datetime2 NOT NULL,
    [DaySalary] int NULL,
    [KpiRate] int NULL,
    [BasicStationarySal] int NULL,
    [basicSala] int NULL,
    [NoPay] decimal(18,2) NOT NULL,
    [Bra1] int NULL,
    [Bra2] int NULL,
    CONSTRAINT [PK_SalaryReports] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SalaryReports_Employe_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employe] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [Loanrepayment] (
    [Id] int NOT NULL IDENTITY,
    [LoanId] int NULL,
    [MonthNo] int NOT NULL,
    [PaymentDate] datetime2 NOT NULL,
    [InstallmentAmount] decimal(18,2) NOT NULL,
    [RemainingBalance] decimal(18,2) NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Loanrepayment] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Loanrepayment_Loans_LoanId] FOREIGN KEY ([LoanId]) REFERENCES [Loans] ([Id])
);

CREATE INDEX [IX_Departments_EmployeeCategoriesId] ON [Departments] ([EmployeeCategoriesId]);

CREATE INDEX [IX_Employe_DepartmentID] ON [Employe] ([DepartmentID]);

CREATE INDEX [IX_Employe_EmployeeCategoriesID] ON [Employe] ([EmployeeCategoriesID]);

CREATE INDEX [IX_EmployeeOvertimes_EmployeId] ON [EmployeeOvertimes] ([EmployeId]);

CREATE INDEX [IX_EmployeeOvertimes_OtId] ON [EmployeeOvertimes] ([OtId]);

CREATE INDEX [IX_LeaveBalances_EmployeeId] ON [LeaveBalances] ([EmployeeId]);

CREATE INDEX [IX_Leaves_EmployeID] ON [Leaves] ([EmployeID]);

CREATE INDEX [IX_Leaves2_EmployeeId] ON [Leaves2] ([EmployeeId]);

CREATE INDEX [IX_Loanrepayment_LoanId] ON [Loanrepayment] ([LoanId]);

CREATE INDEX [IX_Loans_EmployeID] ON [Loans] ([EmployeID]);

CREATE INDEX [IX_NoPayDay_EmployeID] ON [NoPayDay] ([EmployeID]);

CREATE INDEX [IX_NoPayEntries_EmployeeId] ON [NoPayEntries] ([EmployeeId]);

CREATE INDEX [IX_PasswordResetTokens_UserId] ON [PasswordResetTokens] ([UserId]);

CREATE INDEX [IX_SalaryReports_EmployeeId] ON [SalaryReports] ([EmployeeId]);

CREATE INDEX [IX_UserRoles_RolesId] ON [UserRoles] ([RolesId]);

CREATE INDEX [IX_UserRoles_UserId] ON [UserRoles] ([UserId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251218154353_Initial', N'9.0.7');

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260210173510_UpdateSchema', N'9.0.7');

COMMIT;
GO

