using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RosterAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace RosterAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
      services.Configure<JWT>(Configuration.GetSection("JWT"));  
            var key = Encoding.UTF8.GetBytes(Configuration["JWT:key"].ToString());
            services.AddAuthentication(x =>
            {
              x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
              x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
              x.RequireHttpsMetadata = false;
              x.SaveToken = false;
              x.TokenValidationParameters = new TokenValidationParameters
              {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,

                ValidIssuer = "http://localhost:52103",
                ValidAudience = "http://localhost:52103",
                ValidateLifetime = true
              };
            });
            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options => {
              var resolver = options.SerializerSettings.ContractResolver;
              if (resolver != null)
                (resolver as DefaultContractResolver).NamingStrategy = null; 
            });

            services.AddDbContext<DBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

            services.AddCors(options =>
            {
              options.AddPolicy("EnableCORS", builder =>
              {
                builder.WithOrigins(Configuration["JWT:Client_URL"].ToString())
                  .AllowAnyHeader()
                  .AllowAnyMethod();
                //.AllowCredentials()
                //.Build();
            });
      });
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseCors(builder =>
            builder.WithOrigins(Configuration["JWT:Client_URL"].ToString())
            .AllowAnyHeader()
            .AllowAnyMethod()
            );
            app.UseMvc();
        }
    }
}
