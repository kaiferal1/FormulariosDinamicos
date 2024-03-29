USE [master]
GO
/****** Object:  Database [GYGBDD]    Script Date: 25/08/2019 12:20:41 p. m. ******/
CREATE DATABASE [GYGBDD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GYGBDD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.FINANZAS\MSSQL\DATA\GYGBDD.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'GYGBDD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.FINANZAS\MSSQL\DATA\GYGBDD_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [GYGBDD] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GYGBDD].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GYGBDD] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GYGBDD] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GYGBDD] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GYGBDD] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GYGBDD] SET ARITHABORT OFF 
GO
ALTER DATABASE [GYGBDD] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GYGBDD] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GYGBDD] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GYGBDD] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GYGBDD] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GYGBDD] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GYGBDD] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GYGBDD] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GYGBDD] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GYGBDD] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GYGBDD] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GYGBDD] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GYGBDD] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GYGBDD] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GYGBDD] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GYGBDD] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GYGBDD] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GYGBDD] SET RECOVERY FULL 
GO
ALTER DATABASE [GYGBDD] SET  MULTI_USER 
GO
ALTER DATABASE [GYGBDD] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GYGBDD] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GYGBDD] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GYGBDD] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [GYGBDD]
GO
/****** Object:  User [kai]    Script Date: 25/08/2019 12:20:42 p. m. ******/
CREATE USER [kai] FOR LOGIN [kai] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[FRM_Control]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_Control](
	[idControl] [int] IDENTITY(1,1) NOT NULL,
	[Directiva] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FRM_Formulario_Zacapoaxtla]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_Formulario_Zacapoaxtla](
	[idFormulario_Zacapoaxtla] [int] IDENTITY(1,1) NOT NULL,
	[Localidad] [varchar](500) NULL,
	[Obra] [varchar](500) NULL,
	[Monto] [varchar](500) NULL,
	[IVA] [varchar](500) NULL,
	[Total] [varchar](500) NULL,
	[ISR] [varchar](500) NULL,
	[Kilometros] [varchar](500) NULL,
	[Descripcion_] [varchar](500) NULL,
	[Personas_Beneficiadas] [varchar](500) NULL,
	[Fecha_Inicio] [varchar](500) NULL,
	[Fecha_Termino] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FRM_jornada_salud]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_jornada_salud](
	[idjornada_salud] [int] IDENTITY(1,1) NOT NULL,
	[Hombres] [varchar](500) NULL,
	[Mujeres] [varchar](500) NULL,
	[Localidad] [varchar](500) NULL,
	[edades] [varchar](500) NULL,
	[servicio] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FRM_NewPruwA23]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_NewPruwA23](
	[idNewPruwA23] [int] IDENTITY(1,1) NOT NULL,
	[SASASASASASAS] [varchar](500) NULL,
	[aaaaaaaaaaaaaaaa] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FRM_Prueba_Forms]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_Prueba_Forms](
	[idPrueba_Forms] [int] IDENTITY(1,1) NOT NULL,
	[campo_texto] [varchar](500) NULL,
	[campo_fecha] [varchar](500) NULL,
	[campo_numeros] [varchar](500) NULL,
	[campo_correo] [varchar](500) NULL,
	[campo_telefono] [varchar](500) NULL,
	[campo_de_checks] [varchar](500) NULL,
	[campo_radio] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FRM_Prueba_Full_Forms]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_Prueba_Full_Forms](
	[idPrueba_Full_Forms] [int] IDENTITY(1,1) NOT NULL,
	[campo_texto] [varchar](500) NULL,
	[campo_fecha] [varchar](500) NULL,
	[campo_numeros] [varchar](500) NULL,
	[campo_correo] [varchar](500) NULL,
	[campo_telefono] [varchar](500) NULL,
	[campo_ckbx] [varchar](500) NULL,
	[campo_radio] [varchar](500) NULL,
	[campo_select] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FRM_v_i_c_t_o_r]    Script Date: 25/08/2019 12:20:42 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FRM_v_i_c_t_o_r](
	[idv_i_c_t_o_r] [int] IDENTITY(1,1) NOT NULL,
	[pregunta_1] [varchar](500) NULL,
	[las_preguntas_lalala] [varchar](500) NULL,
	[lallalal_lalalal] [varchar](500) NULL,
	[qwertyukjhgfds] [varchar](500) NULL,
	[que_edad_se_produce_eso] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rel_FormularioMunicipio]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rel_FormularioMunicipio](
	[idFormulario] [int] NULL,
	[idMunicipio] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Capturas]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Capturas](
	[idCapturas] [int] IDENTITY(1,1) NOT NULL,
	[idForm] [int] NULL,
	[json] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Formularios]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Formularios](
	[idFormulario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](200) NULL,
	[FormHTML] [nvarchar](max) NULL,
	[Jquery] [nvarchar](max) NULL,
	[NodeCode] [varchar](max) NULL,
	[idSeccion] [varchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Municipio]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Municipio](
	[idMunicipio] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](300) NULL,
	[Descripcion] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Pantillas]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Pantillas](
	[idPantillas] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[FormHTML] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Seccion]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Seccion](
	[idSeccion] [int] NULL,
	[nombre] [varchar](50) NULL,
	[idPadre] [varchar](50) NULL,
	[nivel] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Usuario]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](100) NULL,
	[pass] [varchar](100) NULL,
	[correo] [varchar](50) NULL,
	[catTipoUser] [int] NULL,
	[idProveedor] [int] NULL,
	[estatus] [int] NULL,
	[nombre] [varchar](500) NULL,
	[idMunicipio] [int] NULL,
 CONSTRAINT [PK_TB_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TB_Usuarios]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_Usuarios](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](50) NULL,
	[pass] [varchar](50) NULL,
	[idMunicipio] [int] NULL,
 CONSTRAINT [PK_TB_Usuarios] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[Formularios_CRUD]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Formularios_CRUD]
	@opc int = 0
	, @idMunicipio int = 0
	, @idFormulario int = 0
	, @FormHTML nvarchar(max) = ''
	, @jquery nvarchar(max) = ''
	, @nodejs nvarchar(max) = ''
	, @nombre varchar(200) = ''
	, @idPadre varchar(50) = ''
	, @idSeccion varchar(50) = ''
	, @sqlQ nvarchar(MAX) = ''
	
-- ==================================================
-- 1 Insertar un nuevo registro 
-- 2 Seleccionar todos los registros
-- 3 Actualizar un registro
-- 4 Eliminar un registro
-- 5 Obtener solo un registro en base al id
-- 6 obtener todos los municipios
-- 7 obtener la seccion en base a un padre
-- ==================================================

AS
BEGIN
	if(@opc=1)
	BEGIN
		insert into TB_Formularios select @nombre,@FormHTML,@jquery,@nodejs,@idSeccion
		--insert into Rel_FormularioMunicipio SELECT @@IDENTITY, @idMunicipio 
		exec sp_executesql @sqlQ
		SELECT bandera = '1', mensaje = 'Se guardo correctamente'
	END

	if(@opc=2)
	BEGIN
		SELECT * FROM TB_Formularios WHERE idSeccion = @idSeccion
		SELECT bandera = '1', mensaje = '--'
	END

	if(@opc = 3)
	BEGIN
		UPDATE TB_Formularios set FormHTML=@FormHTML, Jquery= @jquery ,NodeCode = @nodejs
		SELECT bandera = '1', mensaje = 'Se actualizo el registro'
	END

	if(@opc=4)
	BEGIN
		DELETE TB_Formularios WHERE idFormulario = @idFormulario
		SELECT bandera = '1', mensaje = 'Se elimino el registro'
	END

	if(@opc=5)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT * FROM TB_Formularios WHERE idFormulario = @idFormulario
	END

	if(@opc=6)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		--SELECT idMunicipio 'id', Nombre 'text' FROM dbo.TB_Municipio
		SELECT idMunicipio 'id', Nombre 'valor', Descripcion 'text' FROM dbo.TB_Municipio
	END

	if(@opc=7)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT idSeccion 'id', nombre 'text' FROM dbo.TB_Seccion WHERE idPadre = @idPadre
	END
	
END
GO
/****** Object:  StoredProcedure [dbo].[LlenarCampos_CRUD]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[LlenarCampos_CRUD]
	@opc int = 0
	, @idMunicipio int = 0
	, @idFormulario int = 0
	, @FormHTML nvarchar(max) = ''
	, @jquery nvarchar(max) = ''
	, @nodejs nvarchar(max) = ''
	, @nombre varchar(200) = ''
	, @idPadre varchar(50) = ''
	, @idSeccion varchar(50) = ''
	, @idCapturas int = 0
	, @idForm int = 0
    , @json varchar(max) = ''
	
-- ==================================================
-- 1 obtener una plantilla  en base al id de la plantilla
-- 2 obtener plantillas en base a la seccion
-- 3 Agrega un nuevo valor o actualiza en caso de ya existir
-- 4 obtener Tabla 
-- 5
-- 6 obtener los municipios 
-- 7 obtener las secciones en base al padre 
-- ==================================================

AS
BEGIN
	if(@opc = 1)
	BEGIN
		SELECT * FROM TB_Formularios WHERE idFormulario = @idFormulario
		SELECT * FROM TB_Capturas WHERE idForm = @idFormulario
		SELECT bandera = '1', mensaje = '--'
	END

	if(@opc = 2)
	BEGIN
		SELECT * FROM TB_Formularios WHERE idSeccion = @idSeccion
		SELECT bandera = '1', mensaje = '--'
	END

	if(@opc = 3)
	BEGIN
		IF(EXISTS(SELECT * FROM dbo.TB_Capturas WHERE idCapturas = @idCapturas))
		BEGIN
			UPDATE dbo.TB_Capturas SET [json] = @json WHERE idCapturas = @idCapturas
		END
		ELSE
		BEGIN
			INSERT INTO dbo.TB_Capturas SELECT @idForm, @json
		END
		
		SELECT bandera = '1', mensaje = 'Se guardaron los registro'
	END

	if(@opc = 4)
	BEGIN
		
		declare @tbl nvarchar(1000) = 'FRM_' + (SELECT REPLACE(nombre,' ','_') FROM dbo.TB_Formularios WHERE idFormulario = @idFormulario)
		declare @query nvarchar(1000) = 'SELECT * FROM dbo.' + @tbl
		SELECT SC.NAME FROM sys.objects SO INNER JOIN sys.columns SC ON SO.OBJECT_ID = SC.OBJECT_ID WHERE SO.name = @tbl
		
		exec sp_executesql @query

		SELECT bandera = '1', mensaje = '--'
	END

	if(@opc=5)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		--SELECT * FROM TB_Formularios WHERE idFormulario = @idFormulario
	END

	if(@opc=6)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		--SELECT idMunicipio 'id', Nombre 'text' FROM dbo.TB_Municipio
		SELECT idMunicipio 'id', Nombre 'valor', Descripcion 'text' FROM dbo.TB_Municipio
		
	END

	if(@opc=7)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT idSeccion, nombre FROM dbo.TB_Seccion WHERE idPadre = @idPadre
	END
	
END
GO
/****** Object:  StoredProcedure [dbo].[Municipio_Crud]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Municipio_Crud]
	@opc int =0,
	@idMunicipio int =0,
	@nombre varchar(300),
	@descripcion varchar(500)

AS
BEGIN
	if(@opc =1)
	begin
		insert into TB_Municipio select @nombre,@descripcion
	end
	if(@opc=2)
	begin
		select * from TB_Municipio
	end
END
GO
/****** Object:  StoredProcedure [dbo].[Plantillas_CRUD]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Plantillas_CRUD]
	@opc int = 0
	--, @idMunicipio int = 0
	, @idPlantillas int = 0
	, @FormHTML nvarchar(max) = ''
	--, @jquery nvarchar(max) = ''
	--, @nodejs nvarchar(max) = ''
	, @nombre varchar(200) = ''
	, @idPadre varchar(50) = ''
	, @idSeccion varchar(50) = ''
	, @sqlQ nvarchar(MAX) = ''
	
-- ==================================================
-- 1 Insertar un nuevo registro 
-- 2 Seleccionar todos los registros
-- 3 Actualizar un registro
-- 4 Eliminar un registro
-- 5 Obtener solo un registro en base al id
-- 6 obtener todos los municipios
-- 7 obtener la seccion en base a un padre
-- ==================================================

AS
BEGIN
	if(@opc=1)
	BEGIN
		insert into TB_Plantillas select @nombre,@FormHTML
		--insert into Rel_FormularioMunicipio SELECT @@IDENTITY, @idMunicipio 
		--exec sp_executesql @sqlQ
		SELECT bandera = '1', mensaje = 'Se guardo correctamente'
	END

	if(@opc=2)
	BEGIN
		SELECT * FROM dbo.TB_Plantillas
		SELECT bandera = '1', mensaje = '--'
	END

	if(@opc = 3)
	BEGIN
		UPDATE TB_Plantillas set FormHTML=@FormHTML
		SELECT bandera = '1', mensaje = 'Se actualizo el registro'
	END

	if(@opc=4)
	BEGIN
		DELETE TB_Plantillas WHERE idPlantillas = @idPlantillas
		SELECT bandera = '1', mensaje = 'Se elimino el registro'
	END

	if(@opc=5)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT * FROM TB_Formularios WHERE idFormulario = @idPlantillas
	END

	if(@opc=6)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT idMunicipio 'id', Nombre 'text' FROM dbo.TB_Municipio
		--SELECT idMunicipio 'id', Descripcion 'text' FROM dbo.TB_Municipio
	END

	if(@opc=7)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT idSeccion 'id', nombre 'text' FROM dbo.TB_Seccion WHERE idPadre = @idPadre
	END
	
END
GO
/****** Object:  StoredProcedure [dbo].[Usuarios_CRUD]    Script Date: 25/08/2019 12:20:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Usuarios_CRUD] 
	@opc int=0,
	@idUsuario int = 0,
	@usuario varchar(100)='',
	@pass varchar(100)='',
	@correo varchar(100)='',
	@catTipoUser int=0,
	@idProveedor int=0,
	@estatus varchar(50)='',
	@idUsr int = 0,
	@nombre varchar(100) = ''

AS
BEGIN
	if(@opc=1)
	begin
	
		--caqso de insercion de datos
		if(exists(select * from TB_Usuario where usuario=@usuario  ))
		begin	
			SELECT bandera = '-1', mensaje = 'Usuario ya Registrado'
			select 'Usuario ya Registrado'
		end
		else
		begin
				if(	(SELECT CHARINDEX('@',@correo)  )!=0)
				begin
						if(exists(select * from TB_Usuario where usuario=@usuario  ))
						begin	
							SELECT bandera = '-1', mensaje = 'Usuario ya Registrado'
						end
						else
						begin
							declare @msg varchar (100) = 'Usuario Ingresado'
							insert into TB_Usuario select @usuario,@pass,@correo,@catTipoUser,@idProveedor,@estatus,@nombre,0
							insert into TB_RegistroActividades select 'TB_Usuario',GETDATE(),@idUsr,'Insercion de  nuevo usuario '+@usuario +' con correo' +@correo

							if(@catTipoUser = 2 )
							BEGIN
								set @msg = 'NuevoProveedor'
							END
							SELECT bandera = '1', mensaje = @msg
					end
				end
				else
				begin
					SELECT bandera = '-1', mensaje = 'Favor de validar su Email'
				end
		end
	end

	if(@opc=2)
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		if(@catTipoUser = 1)
		BEGIN
			select 
			TB_Usuario.idUsuario,
			TB_Usuario.usuario,
			TB_Usuario.pass,
			TB_Usuario.correo ,
			Cat_TipoUser.descripcion as catTipoUser ,
			TB_Proveedor.razonSocial as 'idProveedor'
			,TB_Usuario.catTipoUser 'idcattipouser'
			,TB_Usuario.idProveedor 'idprov'
			,TB_Usuario.estatus
			 from TB_Usuario
			inner join Cat_TipoUser
			on Cat_TipoUser.idCatTipoUser = TB_Usuario.catTipoUser
			left join TB_Proveedor
			on TB_Proveedor.idProveedor=TB_Usuario.idProveedor
			where idUsuario!=15 and idUsuario!=16
		END
		ELSE
		BEGIN
		--select * from Cat_TipoUser
			if(@catTipoUser=3)
			begin
					select 
					TB_Usuario.idUsuario,
					TB_Usuario.usuario,
					TB_Usuario.pass,
					TB_Usuario.correo ,
					Cat_TipoUser.descripcion as catTipoUser ,
					TB_Proveedor.razonSocial as 'idProveedor'
					/*identificadores */
					,TB_Usuario.catTipoUser 'idcattipouser'
					,TB_Usuario.idProveedor 'idprov'
					,TB_Usuario.estatus
					 from TB_Usuario
					inner join Cat_TipoUser
					on Cat_TipoUser.idCatTipoUser = TB_Usuario.catTipoUser
					left join TB_Proveedor
					on TB_Proveedor.idProveedor=TB_Usuario.idProveedor
					where idUsuario!=15 and idUsuario!=16 and catTipoUser = 2
			end
			else
			begin
					select 
					TB_Usuario.idUsuario,
					TB_Usuario.usuario,
					'**********' 'pass',
					TB_Usuario.correo ,
					Cat_TipoUser.descripcion as catTipoUser ,
					TB_Proveedor.razonSocial as 'idProveedor'
					/*identificadores */
					,TB_Usuario.catTipoUser 'idcattipouser'
					,TB_Usuario.idProveedor 'idprov'
					,TB_Usuario.estatus
					 from TB_Usuario
					inner join Cat_TipoUser
					on Cat_TipoUser.idCatTipoUser = TB_Usuario.catTipoUser
					left join TB_Proveedor
					on TB_Proveedor.idProveedor=TB_Usuario.idProveedor
					where idUsuario!=15 and idUsuario!=16 and catTipoUser != 1
			end
			
		END	
	END

	if(@opc=3)
	begin
		SELECT bandera = '1', mensaje = 'Se modifico correctamente'
		--select * from Cat_TipoUser
		 if(@catTipoUser!=2)
		 begin 
		  update dbo.TB_Usuario set 
		    usuario = @usuario,
			pass = @pass ,
			correo = @correo,
			catTipoUser = @catTipoUser,
			idProveedor = 0,
			estatus = @estatus,
			nombre = @nombre
			where idUsuario =@idUsuario



			insert into TB_RegistroActividades select 'TB_Usuario',GETDATE(),@idUsr,'Modificacion de usuario: '+@usuario 
		 end
		 else
		 begin
				 update dbo.TB_Usuario set 
			usuario = @usuario,
			pass = @pass ,
			correo = @correo,
			catTipoUser = @catTipoUser,
			idProveedor = @idProveedor,
			estatus = @estatus
			where idUsuario =@idUsuario
			
			insert into TB_RegistroActividades select 'TB_Usuario',GETDATE(),@idUsr,'Modificacion de usuario: '+@usuario 
		end

	end

	if(@opc=4)
	begin
		
		 --mostrar catalogo de tipos de usuarios
		 SELECT bandera = '1', mensaje = '--'
		SELECT idCatTipoUser 'id',descripcion 'text'
		FROM dbo.Cat_TipoUser

	end

	if(@opc=5)
	begin
		 --cargar provedores
	
				 SELECT bandera = '1', mensaje = '--'
				SELECT idProveedor 'id',razonSocial 'text'
				FROM dbo.TB_Proveedor
	end

	if(@opc = 6) -- valida si existe un usuario y contraseña
	begin
		if(exists(SELECT * FROM TB_Usuario where usuario=@usuario and pass=@pass AND estatus = 1 ))
		begin
			declare @tipo int = 0
			select @tipo = catTipoUser from dbo.TB_Usuario where usuario=@usuario and pass=@pass AND estatus = 1
			SELECT bandera = '1', mensaje = '--'
			SELECT idProveedor,catTipoUser,idUsuario,usuario,idMunicipio
			FROM TB_Usuario where usuario=@usuario and pass=@pass AND estatus = 1

			--select a.texto,a.url,a.ico, a.catalogo from Cat_Menus a
			--inner join Rel_Menus_TipoUser b on a.idMenu = b.idMenussamuaqkFaier

			--inner join TB_Usuario c on b.idCatTipoUser =c.catTipoUser
			--where c.usuario=@usuario and c.pass=@pass AND c.estatus = 1
			--order by catalogo ,descripcion

			
			
		end
		else
		begin
			SELECT bandera = '-1', mensaje = 'El usuario o contraseña no Existe'
			SELECT 0 'idProveedor',0 'catTipoUser'
		end
	end

	if(@opc = 7) --Select Proveedores Where idUser  = 
	begin
		SELECT bandera = '1', mensaje = '--'
		SELECt idProveedor,razonSocial FROM TB_Proveedor 
		WHERE idProveedor IN (SELECT idProveedor FROM TB_UsuarioProveedor WHERE idUsuario = @idUsuario)
	end

	if(@opc = 8) --Add New Proveedor
	begin 
		if(not exists(SELECT * FROM TB_UsuarioProveedor where idProveedor = @idProveedor and idUsuario = @idUsuario))
		begin
			INSERT INTO TB_UsuarioProveedor SELECT @idUsuario,@idProveedor
			SELECT bandera = '1', mensaje = 'Proveedor Agregado'
		end
		ELSE
		BEGIN
			SELECT bandera = '1', mensaje = 'Proveedor Ya Agregado'
		END
	end

	if(@opc = 9) --Delete Proveedor
	begin 
		DELETE TB_UsuarioProveedor WHERE idProveedor = @idProveedor and idUsuario = @idUsuario
		SELECT bandera = '1', mensaje = 'Proveedor retirado'
	end

	if(@opc = 10) --Consulta de id de los proveedores en base a un super usuario
	begin 
		SELECT idProveedor FROM TB_UsuarioProveedor WHERE idUsuario = @idUsuario AND idProveedor <> @idUsuario
		SELECT bandera = '1', mensaje = '-'
	end

	if(@opc = 11) --seleccionar un solo usuario en base al id
	BEGIN
		SELECT bandera = '1', mensaje = '--'
		SELECT usuario,pass,correo,catTipoUser,idProveedor,estatus,nombre FROM dbo.TB_Usuario
		WHERE idUsuario = @idUsuario
	END
	if(@opc=12)
	begin
		SELECT bandera = '1', mensaje = '--'
		delete TB_Usuario  where idUsuario=@idUsuario
	end

END
GO
USE [master]
GO
ALTER DATABASE [GYGBDD] SET  READ_WRITE 
GO
