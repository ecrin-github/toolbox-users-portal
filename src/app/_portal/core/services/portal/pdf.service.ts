import {Injectable} from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ResourceInterface } from '../../interfaces/entities/resource.interface';


@Injectable({providedIn: 'root'})
export class PdfService {

  constructor() {
  }

  multipleResourcesPDFGenerator(data: Array<ResourceInterface>) {

    const doc = new jsPDF();
    const fileName = 'Resources list - ' + Date.now().toString();

    let bodyData: Array<any> = [];

    data.forEach((resourceData, index) => {

      bodyData.push([{content: resourceData.title, colSpan: 2, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'bold', fontSize: 16}}]);

      let abstract = 'NaN';
      if (resourceData.abstract !== null && resourceData.abstract !== undefined) {
        if (resourceData.abstract.trim() !== '') {
          abstract = resourceData.abstract;
        }
      }
      bodyData.push([
          {content: 'Abstracts', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: abstract, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);


      let authors = 'NaN';
      if (resourceData.authors !== null && resourceData.authors !== undefined) {
        if (resourceData.authors.trim() !== '') {
          authors = resourceData.authors;
        }
      }
      bodyData.push([
        {content: 'Authors', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: authors, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let doi = 'NaN';
      if (resourceData.doi !== null && resourceData.doi !== undefined) {
        if (resourceData.doi.trim() !== '') {
          doi = resourceData.doi;
        }
      }
      bodyData.push([
        {content: 'DOI', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: doi, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let yearOfPublication = 'NaN';
      if (resourceData.year_of_publication !== null && resourceData.year_of_publication !== undefined) {
        yearOfPublication = resourceData.year_of_publication.toString();
      }
      bodyData.push([
        {content: 'Publication year', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: yearOfPublication, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let typeOfResource = 'NaN';
      if (resourceData.type_of_resource !== null && resourceData.type_of_resource !== undefined) {
        if (resourceData.type_of_resource.trim() !== '') {
          typeOfResource = resourceData.type_of_resource;
        }
      }
      bodyData.push([
        {content: 'Type of resource', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: typeOfResource, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let url = 'NaN';
      if (resourceData.url !== null && resourceData.url !== undefined) {
        if (resourceData.url.trim() !== '') {
          url = resourceData.url;
        }
      }
      bodyData.push([
        {content: 'URL', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: url, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let fileUrl = 'NaN';
      if (resourceData.resource_file !== null && resourceData.resource_file !== undefined) {
        if (resourceData.resource_file.trim() !== '') {
          fileUrl = resourceData.resource_file;
        }
      }
      bodyData.push([
        {content: 'Attached file', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: fileUrl, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);



      bodyData.push([
        {content: 'Categories information', rowSpan: 1, colSpan: 2,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 14, minCellWidth: 45}},
      ]);


      let sensitiveData = '';
      if (resourceData.tags.sensitive_data !== null && resourceData.tags.sensitive_data !== undefined) {
        if (resourceData.tags.sensitive_data.length  > 0) {
          for (const resType of resourceData.tags.sensitive_data) {
            sensitiveData += resType.name + '; ';
          }
        } else {
          sensitiveData = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Sensitive data:', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: sensitiveData, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let resourceTypes = '';
      if (resourceData.tags.resource_type !== null && resourceData.tags.resource_type !== undefined) {
        if (resourceData.tags.resource_type.length  > 0) {
          for (const resType of resourceData.tags.resource_type) {
            resourceTypes += resType.name + '; ';
          }
        } else {
          resourceTypes = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Resource type(s)', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: resourceTypes, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let researchFields = '';
      if (resourceData.tags.research_field !== null && resourceData.tags.research_field !== undefined) {
        if (resourceData.tags.research_field.length  > 0) {
          for (const resField of resourceData.tags.research_field) {
            researchFields += resField.name + '; ';
          }
        } else {
          researchFields = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Research field(s)', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: researchFields, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let dataType = '';
      if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
        if (resourceData.tags.data_type.name !== null && resourceData.tags.data_type.name.trim() !== '') {
          dataType = resourceData.tags.data_type.name;
        } else {
          dataType = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Data type(s)', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: dataType, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let dataSubtypes = '';
      if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
        if (resourceData.tags.data_type.subs !== null) {
          if (resourceData.tags.data_type.subs.length > 0) {
            for (const dataSub of resourceData.tags.data_type.subs) {
              dataSubtypes += dataSub.name + '; ';
            }
          } else {
            dataSubtypes = 'NaN';
          }
        } else {
          dataSubtypes = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Data subtype(s)', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: dataSubtypes, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let geoScope = '';
      if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
        if (resourceData.tags.geographical_scope.name !== null && resourceData.tags.geographical_scope.name.trim() !== '') {
          geoScope = resourceData.tags.geographical_scope.name;
        } else {
          geoScope = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Geographical scope', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: geoScope, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let countries = '';
      if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
        if (resourceData.tags.geographical_scope.countries_grouping !== null) {
          if (resourceData.tags.geographical_scope.countries_grouping.length > 0) {
            for (const country of resourceData.tags.geographical_scope.countries_grouping) {
              countries += country + '; ';
            }
          } else {
            countries = 'NaN';
          }
        } else {
          countries = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Countries grouping', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: countries, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      let specificTopics = '';
      if (resourceData.tags.specific_topics !== null && resourceData.tags.specific_topics !== undefined) {
        if (resourceData.tags.specific_topics.length  > 0) {
          for (const specTopic of resourceData.tags.specific_topics) {
            specificTopics += specTopic.name + '; ';
          }
        } else {
          specificTopics = 'NaN';
        }
      }
      bodyData.push([
        {content: 'Specific topic(s)', rowSpan: 1,
          styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
        {content: specificTopics, rowSpan: 1,
          styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
      ]);

      // const splitTitle = doc.splitTextToSize(data[i].title, 180);

      if (index === 0) {
        // doc.text(splitTitle, 15, 10);
        // @ts-ignore
        doc.autoTable({
          startY: 20,
          theme: 'grid',
          body: bodyData,
        });
      } else {
        // @ts-ignore
        // doc.text(splitTitle, 5, doc.autoTable.previous.finalY + 15);
        // @ts-ignore
        doc.autoTable({
          // @ts-ignore
          startY: doc.autoTable.previous.finalY + 5,
          theme: 'grid',
          body: bodyData,
        });
      }
      bodyData = [];
    });

    doc.save(fileName + '.pdf');
  }


  singleResourcePDFGenerator(resourceData: ResourceInterface){
    const doc = new jsPDF();

    const bodyData: Array<any> = [];

    bodyData.push([{content: resourceData.title, colSpan: 2, rowSpan: 1,
      styles: {halign: 'left', fontStyle: 'bold', fontSize: 16}}]);

    let abstract = 'NaN';
    if (resourceData.abstract !== null && resourceData.abstract !== undefined) {
      if (resourceData.abstract.trim() !== '') {
        abstract = resourceData.abstract;
      }
    }
    bodyData.push([
      {content: 'Abstracts', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: abstract, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);


    let authors = 'NaN';
    if (resourceData.authors !== null && resourceData.authors !== undefined) {
      if (resourceData.authors.trim() !== '') {
        authors = resourceData.authors;
      }
    }
    bodyData.push([
      {content: 'Authors', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: authors, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let doi = 'NaN';
    if (resourceData.doi !== null && resourceData.doi !== undefined) {
      if (resourceData.doi.trim() !== '') {
        doi = resourceData.doi;
      }
    }
    bodyData.push([
      {content: 'DOI', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: doi, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let yearOfPublication = 'NaN';
    if (resourceData.year_of_publication !== null && resourceData.year_of_publication !== undefined) {
      yearOfPublication = resourceData.year_of_publication.toString();
    }
    bodyData.push([
      {content: 'Publication year', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: yearOfPublication, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let typeOfResource = 'NaN';
    if (resourceData.type_of_resource !== null && resourceData.type_of_resource !== undefined) {
      if (resourceData.type_of_resource.trim() !== '') {
        typeOfResource = resourceData.type_of_resource;
      }
    }
    bodyData.push([
      {content: 'Type of resource', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: typeOfResource, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let url = 'NaN';
    if (resourceData.url !== null && resourceData.url !== undefined) {
      if (resourceData.url.trim() !== '') {
        url = resourceData.url;
      }
    }
    bodyData.push([
      {content: 'URL', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: url, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let fileUrl = 'NaN';
    if (resourceData.resource_file !== null && resourceData.resource_file !== undefined) {
      if (resourceData.resource_file.trim() !== '') {
        fileUrl = resourceData.resource_file;
      }
    }
    bodyData.push([
      {content: 'Attached file', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: fileUrl, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);



    bodyData.push([
      {content: 'Categories information', rowSpan: 1, colSpan: 2,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 14, minCellWidth: 45}},
    ]);


    let sensitiveData = '';
    if (resourceData.tags.sensitive_data !== null && resourceData.tags.sensitive_data !== undefined) {
      if (resourceData.tags.sensitive_data.length  > 0) {
        for (const resType of resourceData.tags.sensitive_data) {
          sensitiveData += resType.name + '; ';
        }
      } else {
        sensitiveData = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Sensitive data:', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: sensitiveData, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let resourceTypes = '';
    if (resourceData.tags.resource_type !== null && resourceData.tags.resource_type !== undefined) {
      if (resourceData.tags.resource_type.length  > 0) {
        for (const resType of resourceData.tags.resource_type) {
          resourceTypes += resType.name + '; ';
        }
      } else {
        resourceTypes = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Resource type(s)', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: resourceTypes, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let researchFields = '';
    if (resourceData.tags.research_field !== null && resourceData.tags.research_field !== undefined) {
      if (resourceData.tags.research_field.length  > 0) {
        for (const resField of resourceData.tags.research_field) {
          researchFields += resField.name + '; ';
        }
      } else {
        researchFields = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Research field(s)', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: researchFields, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let dataType = '';
    if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
      if (resourceData.tags.data_type.name !== null && resourceData.tags.data_type.name.trim() !== '') {
        dataType = resourceData.tags.data_type.name;
      } else {
        dataType = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Data type(s)', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: dataType, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let dataSubtypes = '';
    if (resourceData.tags.data_type !== null && resourceData.tags.data_type !== undefined) {
      if (resourceData.tags.data_type.subs !== null) {
        if (resourceData.tags.data_type.subs.length > 0) {
          for (const dataSub of resourceData.tags.data_type.subs) {
            dataSubtypes += dataSub.name + '; ';
          }
        } else {
          dataSubtypes = 'NaN';
        }
      } else {
        dataSubtypes = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Data subtype(s)', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: dataSubtypes, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let geoScope = '';
    if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
      if (resourceData.tags.geographical_scope.name !== null && resourceData.tags.geographical_scope.name.trim() !== '') {
        geoScope = resourceData.tags.geographical_scope.name;
      } else {
        geoScope = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Geographical scope', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: geoScope, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let countries = '';
    if (resourceData.tags.geographical_scope !== null && resourceData.tags.geographical_scope !== undefined) {
      if (resourceData.tags.geographical_scope.countries_grouping !== null) {
        if (resourceData.tags.geographical_scope.countries_grouping.length > 0) {
          for (const country of resourceData.tags.geographical_scope.countries_grouping) {
            countries += country + '; ';
          }
        } else {
          countries = 'NaN';
        }
      } else {
        countries = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Countries grouping', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: countries, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    let specificTopics = '';
    if (resourceData.tags.specific_topics !== null && resourceData.tags.specific_topics !== undefined) {
      if (resourceData.tags.specific_topics.length  > 0) {
        for (const specTopic of resourceData.tags.specific_topics) {
          specificTopics += specTopic.name + '; ';
        }
      } else {
        specificTopics = 'NaN';
      }
    }
    bodyData.push([
      {content: 'Specific topic(s)', rowSpan: 1,
        styles: {halign: 'center', fontStyle: 'bold', fontSize: 12, minCellWidth: 45}},
      {content: specificTopics, rowSpan: 1,
        styles: {halign: 'left', fontStyle: 'normal', fontSize: 12, minCellWidth: 90}}
    ]);

    // doc.text(doc.splitTextToSize(resourceData.title, 180), 15, 10);
    // @ts-ignore
    doc.autoTable({
      startY: 5,
      theme: 'grid',
      body: bodyData,
    });

    doc.save(resourceData.title + '.pdf');
  }

}
