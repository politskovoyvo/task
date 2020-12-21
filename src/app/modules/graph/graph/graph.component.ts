import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
// import * as d3 from 'd3-selection';
import { Task } from 'src/app/share/models/task';
import { GraphCoreService } from '../core/graph-core.service';
import { GraphService } from '../services/graph.service';
const Node = d3.hierarchy.prototype.constructor;
type TODO_NODE = any;
type TODO_SVG = any;


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  tasks$: Observable<Task[]>;

  nowDate = new Date();

  constructor(private graphService: GraphService) { }

  ngAfterViewInit(): void {
    this.graphService.getTasks()
    .pipe(
      tap(tasks => {
        this.paintGrid(tasks);
      })
    )
    .subscribe();
  }

  ngOnInit(): void { }

  refresh() {
    this.graphService.refresh();
  }

  dateChange(date: Date): void {
    console.log('date change')
  }

  initSVG() {
    return d3
      .select(this.canvas.nativeElement)
      .append('svg')
        .attr("viewBox", [0, 0, 500, 500] as any);
  }
  
  private paintGrid = (tasks: Task[]) => {
    const root: TODO_NODE = new Node;
    const nodes:TODO_NODE[] = [root];
    const links = [];
    
    const svg = this.initSVG();

    // PAINT GRID

    svg.append('line');

    // PAINT GRID

    this.tree(root)

    let link = svg
      .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#000')
        .selectAll('.link');

    let node = svg
      .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .selectAll('.node');
      
    // builder tree item
    for (let i of new Array(6)) {
      this.paintChield(node, nodes, link, links, root, svg);
    }
  }

  tree = (root: TODO_NODE) => {
    return (d3.tree().size([500 - 20, 500 - 20]))(root);
  }

  rLink = (): any => {
    return d3.linkVertical().x((d: any) => d.x).y((d: any)=> d.y);
  }

  private paintChield = (
      node: TODO_NODE, 
      nodes: TODO_NODE[], 
      link: any, 
      links: any[], 
      root: TODO_NODE, 
      svg: TODO_SVG
      ): void => {
    const duration = 500;
    const parent = nodes[0];
    const child = Object.assign(new Node, {parent, depth: parent.depth + 1});

    if (parent.children)  {
      parent.children?.push(child);
    } else {
      parent.children = [child];
    };
    nodes.push(child);
    links.push({source: parent, target: child});
    
    this.tree(root);

    node = node.data(nodes)
      .enter()
      .append('circle')
        .attr('class', 'node')
        .attr('r', 6)
        .attr('cx', (d: any) => d.parent ? d.parent.px : d.px = d.x)
        .attr('cy', (d: any) => d.parent ? d.parent.py : d.py = d.y)
          .on('click', (e) => { 
            this.selectedNode(e); 
          })
      .merge(node);

    link = link.data(links)
      .enter()
      .insert('path', '.node')
        .attr('class', 'link')
        .attr('d', (d: any) => {
          const o = {x: d.source.px, y: d.source.py};
          return this.rLink()({ source: o, target: o });
        })
      .merge(link);

    const t = svg.transition()
      .duration(duration);

    link.transition(t)
      .attr('d', this.rLink());

    node.transition(t)
      .attr('cx', (d) => d.px = d.x)
      .attr('cy', (d) => d.py = d.y);
  }

  private selectedNode = (node: TODO_NODE) => {
  
  } 

  private paintTask = (task: Task) => {
    
  }
}
