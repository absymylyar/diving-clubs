using DivingClubs.Interfaces;
using DivingClubs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DivingClubs.Api.Controllers
{
    public record Person() : IPerson
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string BloodGroup { get; set; }
        public IAddress Address { get; set; }
        public int Id { get; set; }
    }
    public record PatchPerson()
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? BloodGroup { get; set; }
        public IAddress? Address { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class PersonsController : Controller
    {
        private readonly IBusiness<IPerson> business;
        public PersonsController(IBusiness<IPerson> business)
        {
            this.business = business;
        }
        // GET: PersonController
        [HttpGet]
        public IEnumerable<IPerson> Get()
        {
            return this.business.Get();
        }

        [HttpGet("~/Person/{id}")]
        public IPerson? Details(int id)
        {
            return this.business.Get(id);
        }

        [HttpPost("~/Person")]
        public IPerson? Create(Person person)
        {
            return this.business.Save(person);
        }

        [HttpPatch("~/Person/{id}")]
        public IPerson? Modify(int id, PatchPerson person)
        {
            var p = this.business.Get(id);
            if (p != null)
            {
                typeof(PatchPerson)
                    .GetProperties()
                    .ToList()
                    .ForEach(x =>
                    {
                        var value = x.GetValue(person);
                        if (value != null)
                        {
                            p.GetType().GetProperty(x.Name)?.SetValue(p, value);
                        }
                    });
                return this.business.Save(p);
            }
            return null;
        }

        [HttpDelete("~/Person/{id}")]
        public bool Delete(int id)
        {
            return this.business.Delete(id);
        }

        //// GET: PersonController/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: PersonController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: PersonController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        //// POST: PersonController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: PersonController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        //// POST: PersonController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
