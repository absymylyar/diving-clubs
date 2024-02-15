﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DivingClubs.Dao.SqlServer.Datas;

public partial class PersonEntity
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string PhoneNumber { get; set; }

    public DateTime BirthDate { get; set; }

    public string BloodGroup { get; set; }

    public int? AddressId { get; set; }

    public virtual AddressEntity Address { get; set; }

    public virtual ICollection<LicenceEntity> LicenceEntities { get; set; } = new List<LicenceEntity>();

    public virtual ICollection<MonitorEntity> MonitorEntities { get; set; } = new List<MonitorEntity>();
}