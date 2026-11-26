"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "./project-visual";

type Filter = ProjectCategory | "All";

export function ProjectExplorer() {
  const [category, setCategory] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(
    () => (category === "All" ? projects : projects.filter((p) => p.category === category)),
    [category],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
  }, [selected]);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {(["All", ...projectCategories] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === c
                ? "bg-navy-900 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900 hover:ring-slate-300",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-slate-500">
        Showing {filtered.length} demo {filtered.length === 1 ? "project" : "projects"}
        {category !== "All" && <> in {category}</>}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5"
            >
              <div className="relative aspect-[16/9]">
                <ProjectVisual visual={p.visual} />
                {p.isDemo && (
                  <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-semibold text-amber-950">
                    Demo project
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{p.category}</Badge>
                  <Badge variant="outline">Status: {p.status}</Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
                  {p.stack.map((t) => (
                    <li key={t} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                      {t}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="link"
                  size="none"
                  className="mt-auto self-start pt-5"
                  onClick={() => setSelected(p)}
                  aria-haspopup="dialog"
                >
                  View Details<span className="sr-only">: {p.title}</span>
                  <ArrowRight />
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-navy-900">No projects in this category yet.</p>
          <Button variant="secondary" size="sm" className="mt-6" onClick={() => setCategory("All")}>
            Show all projects
          </Button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl bg-white p-0 shadow-2xl"
      >
        {selected && (
          <div>
            <div className="relative aspect-[21/9]">
              <ProjectVisual visual={selected.visual} />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="focus-ring absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge>{selected.category}</Badge>
                <Badge variant="outline">Status: {selected.status}</Badge>
                {selected.isDemo && <Badge variant="warning">Demo / illustrative</Badge>}
              </div>
              <h2 id="project-dialog-title" className="mt-4 text-2xl font-semibold text-navy-900">
                {selected.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{selected.details}</p>
              <h3 className="mt-6 text-sm font-semibold text-navy-900">Technology stack</h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {selected.stack.map((t) => (
                  <li key={t} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
                    {t}
                  </li>
                ))}
              </ul>
              {selected.isDemo && (
                <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
                  This is a demo concept that illustrates the type of solution ICT BMC can deliver. It does not
                  represent an actual client project.
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex h-10 items-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700"
                >
                  Discuss a similar project
                  <ArrowRight className="size-4" />
                </Link>
                <Button variant="secondary" size="sm" className="h-10" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
