# WEB-GIS APPLICATION ACTIVITY (DATA-TIER)

> The program sets up a web-based geographical information system (GIS) using OpenLayers to display maps of Butuan City and Land Cover of the Philippines. It also allows users to interact with the map by providing information about specific geographic features when they click on the map.

Note: Fedora Linux installation process.

### Dependencies

- Java 11 or Java 17
- Geoserver [Platform Independent Binary](https://geoserver.org/release/stable/)
- PostgreSQL and PostGIS Extension
- [PH_MUNI](https://drive.google.com/drive/folders/1aFWR-7z06-f0XeSpM2TMiM1AUPm7ADUq?usp=sharing)

```
sudo mv PH_MUNI /usr/share/geoserver/data_dir/data/shapefiles
```

- [ButuanProjec_4326](https://drive.google.com/drive/folders/1aFWR-7z06-f0XeSpM2TMiM1AUPm7ADUq?usp=sharing)

```
sudo mv ButuanProjec_4326 /usr/share/geoserver
```

### Geoserver Installation

```sudo Downloads/
sudo mv geoserver /usr/share/
sudo cd /usr/share/
unzip geoserver
```

### Start the Geoserver

- Run Command

```
cd /usr/share/geoserver/bin && sudo sh startup.sh
```

- Access: `http://localhost:8080/geoserver`
- Default credentials
  - `USERNAME:` admin
  - `PASSWORD:` geoserver

### PostgreSQL and PgAdmin Installation (Fedora Linux)

- [PostgreSQL](https://docs.fedoraproject.org/en-US/quick-docs/postgresql/)

```
sudo dnf install postgresql-server postgresql-contrib
sudo systemctl enable postgresql
sudo postgresql-setup --initdb --unit postgresql
sudo systemctl start postgresql
```

- [PgAdmin4](https://www.pgadmin.org/download/pgadmin-4-rpm/)

```
sudo rpm -e pgadmin4-fedora-repo
sudo rpm -e pgadmin4-redhat-repo
sudo rpm -i https://ftp.postgresql.org/pub/pgadmin/pgadmin4/yum/pgadmin4-fedora-repo-2-1.noarch.rpm
sudo yum install pgadmin4-web
sudo /usr/pgadmin4/bin/setup-web.sh
```

- Start pgadmin4-web

```
systemctl status httpd
```

- Update pgadmin4-web

```
sudo yum upgrade pgadmin4-web
```

#### Warning (If Error Found)

> Unable to connect to server: connection failed: :1), port 5432 failed: FATAL: Ident authentication failed for user "postgres"X

##### Run command

```
sudo vim /var/lib/pgsql/data/pg_hba.conf
```

##### Alter `pg_hba.conf`

[comment]: <> (md5 could be password)

```
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

### PostGIS Installation

```
sudo dnf install postgis
```

- OR Download [postgis-3.3.3-1.fc38.x86_64.rpm](https://src.fedoraproject.org/rpms/postgis)

```
cd Downloads/ && sudo dnf install postgis-3.3.3-1.fc38.x86_64.rpm
```

### Geoserver Navigation and Setup (specific use-case)

- Access: `http://localhost:8080/geoserver`
- Data > Workspaces > Add new workspace
- New Workspace
  - Name: ITE-18-WEBGIS;
  - Namespace-URI: ITE-18-WEBGIS;
  - Default Workspace: true
- Data > Stores > Add new Store > Shapefile
- Basic Store Info
  - Workspace: ITE-18-WEBGIS
  - Data Source Name: shp
  - Description: shp
  - Shapefile Location > Data Directory > data_dir/data/shapefiles/PH_MUNI/PH_MUNI.shp
  - Click 'Apply' and 'Save'
- Data > Layers > Add a new layer
- New Layer > Add layer from > ITE-18-WEBGIS.shp
  - PH_MUNI > Click 'Publish'
- Layer > Click 'PH_MUNI'
- Edit Layer
  - Name: Municipalities
  - Title: Municipalities
  - Click 'Compute from data' and 'Compute from native bounds'
  - Click 'Apply' and 'Save'
- (Preview)
  - Data > Layer Preview > Municipalities > OpenLayers
- (Add styles : Color and Text)

  - Data > Styles > Add a new style
  - New style

    - Name: Municipalities
    - Workspace: ITE-18-WEBGIS
    - Generate a default style > Choose 'Polygon' > Click 'Generate'
    - Insert

      ```
      <?xml version="1.0" encoding="ISO-8859-1"?>
      <StyledLayerDescriptor version="1.0.0"
        xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
        xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

        <NamedLayer>
          <Name>Municipalities</Name>
          <UserStyle>
            <Title>A dark yellow polygon style</Title>
            <FeatureTypeStyle>
              <Rule>
                <Title>dark yellow polygon</Title>
                <PolygonSymbolizer>
                  <Fill>
                    <CssParameter name="fill">#99cc00
                    </CssParameter>
                  </Fill>
                  <Stroke>
                    <CssParameter name="stroke">#000000</CssParameter>
                    <CssParameter name="stroke-width">0.5</CssParameter>
                  </Stroke>
                </PolygonSymbolizer>
                  <TextSymbolizer>
              <Label>
                        <ogc:PropertyName>Mun_Name</ogc:PropertyName>
                    </Label>
                </TextSymbolizer>
              </Rule>

            </FeatureTypeStyle>
          </UserStyle>
        </NamedLayer>
      </StyledLayerDescriptor>
      ```

    - Click 'Apply' and 'Save'
    - Data > Layers > Click 'Municipalities' >
    - Edit Layer:
      - Default Style: ITE-18-WEBGIS:Municipalities
      - Click 'Apply' and 'Save'

### PgAdmin (PostgreSQL) Navigation and Setup (specific use-case)

##### Within personal server

- Create > Database
  - `Database:` ITE-18-WEBGIS

##### In ITE-18-WEBGIS database

- Create > Extension
  - Name: postgis
- Install postgis-client
- Enter command

```
shp2pgsql -s 4326 /usr/share/geoserver/ButuanProjec_4326/Projected_Butuan.shp public.projected_butuan | psql -h localhost -d ITE-18-WEBGIS -U postgres
```

- In pgAdmin-web, check the database tables if the “projected_butuan" table is successfully imported.
  - Righ-click “projected_butuan" table
    - Click View/Edit Data > All Rows
  - In 'geom' column, click (map icon)

### Activate Geoserver with the new table

- Run

```
cd /usr/share/geoserver/bin && sudo sh startup.sh
```

- Access: `http://localhost:8080/geoserver`
- Data > Workspaces > ITE-18-WEBGIS > Edit Workspace > Mark 'Default Workspace' Check
- Data > Stores > Add new Store > PostGIS
- New Vector Data Source
  - Data Source Name: PostGIS
  - Description: PostGIS
  - database: ITE-18-WEBGIS
  - user: postgres
  - passwd: (server password)
  - Click 'Apply' and 'Save'
- Check
  - Data > Stores > ITE-18-WEBGIS (PostGIS)
- Data > Layers > Add a new Layer
- New Layer
  - Add a layer from > ITE-18-WEBGIS:PostGIS
  - Click 'Publish'
  - Edit Layer
    - Name: projected_butuan_PostGIS
    - Click 'Compute from data' and 'Compute from native bounds'
    - Click 'Apply and Save'
- Check
  - Data > Layers > projected_butuan_Postgis (ITE-18-WEBGIS:projected_butuan_Postgis)
- Data > Layer Preview > projected_butuan_Postgis (ITE-18-WEBGIS:projected_butuan_Postgis) > OpenLayers

### Adding Attribute Query Functionality

- Data > Workspaces >ITE-18-WEBGIS
- Edit Workspaces
  - Services > Check 'WFS'
  - Namespace URI > `http://ITE-18-WEBGIS.com/geoserver/myworkspace`
  - Settings > Check 'Enabled'
  - Click 'Apply' & 'Change'
- Services > WFS
  - Web Feature Service
  - Choose 'ITE-18-WEBGIS'
  - Service Level > 'Complete'
  - Click 'Apply' & 'Change'
- Home > Click 'WFS 1.0.0'
- Copy `<Get onlineResource="http://localhost:8080/geoserver/wfs?request=GetCapabilities"/>`, then append your workspace name in the url before `/wfs?` and use it as the url of the addMapLayerList function.
- Reload `localhost`.
